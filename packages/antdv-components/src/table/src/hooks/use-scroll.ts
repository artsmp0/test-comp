import { useDebounceFn } from '@vueuse/core';
import type { TableProps } from 'ant-design-vue/es';
import type { Ref, WritableComputedRef } from 'vue';
import { computed, getCurrentInstance, nextTick, onUnmounted, ref, toRefs, watchEffect } from 'vue';
import type { Recordable } from '@gupo/common';
import type { GpTableProps } from '../table';

type Nullable<T> = T | null;
export const useScroll = (tableWrapper: Ref<HTMLDivElement | undefined>, dataSource: WritableComputedRef<Recordable<any>[]>) => {
  const { props } = getCurrentInstance()!;
  const { scroll, isWithParentHeight } = toRefs(props as GpTableProps);
  const MIN_HEIGHT = 167;
  const y = ref(MIN_HEIGHT);
  let gpTableHead: Nullable<HTMLDivElement>, // 自定义表头
    antTableHead: Nullable<HTMLDivElement>, // antdv表格头
    antFooter: Nullable<HTMLDivElement>, // antdv表格自定义脚
    antPagination: Nullable<HTMLDivElement>; // antdv分页高度

  onUnmounted(() => {
    resizeObserver?.disconnect();
  });

  const calcDynamicHeight = async () => {
    const antTableHeadH = antTableHead?.clientHeight ?? 0;
    const antPaginationStyle = antPagination ? getComputedStyle(antPagination) : null;
    let marginBottom = 0,
      marginTop = 0;
    if (antPaginationStyle) {
      marginBottom = antPaginationStyle.marginBottom ? parseInt(antPaginationStyle.marginBottom, 10) : 0;
      marginTop = antPaginationStyle.marginTop ? parseInt(antPaginationStyle.marginTop, 10) : 0;
    }
    const antPaginationH = antPagination?.clientHeight ?? 0;
    const antFooterH = antFooter?.clientHeight ?? 0;
    const gpTableHeadH = gpTableHead?.clientHeight ?? 0;
    let tableHeight = tableWrapper.value?.clientHeight ?? 0;
    const style = tableWrapper.value ? getComputedStyle(tableWrapper.value) : undefined;
    if (!tableHeight || !style) return;
    tableHeight -= parseInt(style?.paddingTop) + parseInt(style?.paddingBottom);
    const calcH = tableHeight - gpTableHeadH - antTableHeadH - antPaginationH - antFooterH - marginBottom - marginTop - 2;
    y.value = calcH > MIN_HEIGHT ? calcH : MIN_HEIGHT;
  };
  const debounceCalc = useDebounceFn(calcDynamicHeight, 30);
  const resizeObserver: ResizeObserver | undefined = new ResizeObserver(debounceCalc);
  const isFirst = ref(true);
  const init = async () => {
    if (!tableWrapper.value) {
      return;
    }
    await nextTick();
    antTableHead = tableWrapper.value?.querySelector('.ant-table-thead');
    gpTableHead = tableWrapper.value?.querySelector('.gp-table__head');
    antPagination = tableWrapper.value?.querySelector('.ant-table-pagination');
    antFooter = tableWrapper.value?.querySelector('.ant-table-footer');
    if (isFirst.value) {
      isFirst.value = false;
      antTableHead && resizeObserver?.observe(antTableHead);
      gpTableHead && resizeObserver?.observe(gpTableHead);
      antPagination && resizeObserver?.observe(antPagination);
      antFooter && resizeObserver?.observe(antFooter);
      resizeObserver.observe(document.body);
      resizeObserver.observe(tableWrapper.value);
    }
    debounceCalc();
  };

  const computedScroll = computed(() => {
    if (isWithParentHeight?.value) {
      return Object.assign(
        {
          y: y.value,
        },
        scroll?.value || {}
      ) as TableProps['scroll'];
    }
    return scroll?.value as TableProps['scroll'];
  });

  const resetHeight = async () => {
    await nextTick();
    tableWrapper.value?.querySelector('.ant-table-content')?.setAttribute('style', '');
  };

  watchEffect(() => {
    if (!props.isWithParentHeight) {
      resetHeight();
      return;
    }
    if (dataSource.value.length > 0) {
      init();
    }
  });

  return {
    computedScroll,
  };
};
