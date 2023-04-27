<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import { Button, Space } from 'ant-design-vue';
import { computed } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  showToggle: boolean;
  boxWidth: number;
  searchLoading?: boolean;
}>();

const enum Events {
  updateIsOpen = 'update:isOpen',
  reset = 'reset',
  search = 'search',
}

type Emitter = {
  (evt: Events.updateIsOpen, isOpen: boolean): void;
  (evt: Events.reset, ...params: any): void;
  (evt: Events.search, ...params: any): void;
};

const emitter = defineEmits<Emitter>();

const isOpen = computed({
  get() {
    return props.isOpen;
  },
  set(v) {
    emitter(Events.updateIsOpen, v);
  },
});
</script>

<template>
  <div class="gap-search-opt ant-row ant-form-item" :style="{ width: `${props.boxWidth}px` }">
    <Space>
      <Button :loading="props.searchLoading" @click="emitter(Events.reset)">重置</Button>
      <Button :loading="props.searchLoading" type="primary" @click="emitter(Events.search)">查询</Button>
      <Button v-if="props.showToggle" type="link" @click="isOpen = !isOpen">
        {{ isOpen ? '收起' : '展开' }}
        <DownOutlined :class="['gap-icon-down', isOpen && 'gap-active']" />
      </Button>
    </Space>
  </div>
</template>
