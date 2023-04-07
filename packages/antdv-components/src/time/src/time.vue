<script lang="ts" setup>
import { formatToDate, formatToDateTime, relativeTime } from './time';
import { useIntervalFn } from '@vueuse/core';
import { ref, watch } from 'vue';

type Props = {
  /** 要格式化的时间 */
  time: string | number | Date;
  /** 格式化的方式 */
  mode?: 'relative' | 'date' | 'datetime';
  /** 定时刷新：step 表示定时刷新的秒数，仅相对时间有效 */
  step?: number;
};
const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
  mode: 'datetime',
});
const formatTime = ref('');
function formatDate() {
  let str = '';
  switch (props.mode) {
    case 'date':
      str = formatToDate(props.time);
      break;
    case 'datetime':
      str = formatToDateTime(props.time);
      break;
    case 'relative':
      str = relativeTime(props.time);
      break;
    default:
      break;
  }
  formatTime.value = str;
}

props.step && props.mode === 'relative' && useIntervalFn(formatDate, 1000 * props.step);

watch(
  () => props.time,
  () => {
    formatDate();
  },
  { immediate: true }
);
</script>

<template>
  <span class="gp-time">{{ formatTime }}</span>
</template>
