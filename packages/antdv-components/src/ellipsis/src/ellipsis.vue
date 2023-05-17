<script lang="ts" setup>
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons-vue';
import type { TooltipProps } from 'ant-design-vue';
import { Tooltip } from 'ant-design-vue';
import { shallowRef } from 'vue';
import { ref, watch, nextTick, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 文本 */
    text: string;
    placement?: TooltipProps['placement'];
    line?: number;
    color?: string;
    showTooltip?: boolean;
    expandTrigger?: 'click';
  }>(),
  {
    line: 1,
    showTooltip: true,
  }
);

const $text = shallowRef<HTMLDivElement>();
const isOverflow = ref(true);
const collapsedHeight = ref(0);
const scrollHeight = ref(0);
const lineHight = ref(0);
watch($text, async v => {
  if (v) {
    await nextTick();
    const actualHeight = $text.value?.offsetHeight;
    const overHeight = $text.value?.scrollHeight;
    collapsedHeight.value = actualHeight!;
    scrollHeight.value = overHeight!;
    lineHight.value = parseFloat(getComputedStyle($text.value!).lineHeight);
    if (actualHeight && overHeight && actualHeight < overHeight) {
      isOverflow.value = true;
    } else {
      isOverflow.value = false;
    }
    if (props.expandTrigger) {
      await nextTick();
      $text.value!.style.height = actualHeight + 'px';
    }
  }
});

const isBlock = ref(false);
const style = computed(() => ({
  '--line': props.line,
  // 图标位置需要负的行高，使用margin填充
  '--icon-height': -lineHight.value + 'px',
  display: isBlock.value ? 'inline-block' : '-webkit-inline-box',
}));

const toggleExpand = () => {
  if (!props.expandTrigger) return;
  isBlock.value = !isBlock.value;
  if (isBlock.value) {
    $text.value!.style.height = scrollHeight.value + 'px';
  } else {
    $text.value!.style.height = collapsedHeight.value + 'px';
  }
};

const showTitle = computed(() => {
  return props.expandTrigger ? '点击展开' : props.showTooltip ? '' : props.text;
});
</script>

<template>
  <Tooltip v-if="isOverflow && props.showTooltip" :placement="props.placement" :color="props.color">
    <template #title>{{ props.text }}</template>
    <span ref="$text" :title="showTitle" class="gpa-text" :style="style" @click="toggleExpand">
      {{ props.text }}
    </span>
  </Tooltip>
  <span v-else ref="$text" :title="showTitle" class="gpa-text" :style="style">
    <span v-if="props.expandTrigger" :title="isBlock ? '收起' : '展开'" class="gpa-text-toggle-btn" @click="toggleExpand">
      <DownCircleOutlined v-if="!isBlock" />
      <UpCircleOutlined v-else />
    </span>
    {{ props.text }}
  </span>
</template>
