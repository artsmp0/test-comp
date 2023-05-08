<script lang="ts" setup>
import type { TooltipProps } from 'ant-design-vue';
import { Tooltip } from 'ant-design-vue';
import { ref, watch, nextTick, computed } from 'vue';

const props = withDefaults(
  defineProps<{
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

const $text = ref<HTMLDivElement>();
const isOverflow = ref(true);
watch($text, async v => {
  if (v) {
    await nextTick();
    const actualHeight = $text.value?.offsetHeight;
    const overHeight = $text.value?.scrollHeight;
    if (actualHeight && overHeight && actualHeight < overHeight) {
      isOverflow.value = true;
    } else {
      isOverflow.value = false;
    }
  }
});

const isBlock = ref(false);
const style = computed(() => ({
  '--line': props.line,
  display: isBlock.value ? 'initial' : '-webkit-box',
  cursor: props.expandTrigger ? 'pointer' : 'text',
}));

const toggleExpand = () => {
  if (!props.expandTrigger) return;
  isBlock.value = !isBlock.value;
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
  <span v-else :title="showTitle" class="gpa-text" :style="style" @click="toggleExpand">{{ props.text }}</span>
</template>
