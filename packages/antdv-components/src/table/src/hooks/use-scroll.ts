import { useDebounceFn } from '@vueuse/core';
import type { TableProps } from 'ant-design-vue';
import { computed, nextTick, onUnmounted, ref, Ref } from 'vue';

interface Params {
  scroll: TableProps['scroll'];
  withParentHeight?: boolean;
  tableWrapper: Ref<HTMLDivElement | undefined>;
}
type Nullable<T> = T | null;
export const useScroll = ({ scroll, withParentHeight, tableWrapper }: Params) => {
  const MIN_HEIGHT = 167;
  const y = ref(MIN_HEIGHT);
  let gpTableHead: Nullable<HTMLDivElement>, // 自定义表头
    antTableHead: Nullable<HTMLDivElement>, // antdv表格头
    antFooter: Nullable<HTMLDivElement>, // antdv表格自定义脚
    antPagination: Nullable<HTMLDivElement>; // antdv分页高度
  // onMounted(() => {});

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
    const tableHeight = tableWrapper.value?.clientHeight ?? 0;
    if (!tableHeight) return;
    const calcH = tableHeight - gpTableHeadH - antTableHeadH - antPaginationH - antFooterH - marginBottom - marginTop - 32;
    y.value = calcH > MIN_HEIGHT ? calcH : MIN_HEIGHT;
  };
  const debounceCalc = useDebounceFn(calcDynamicHeight, 200);
  const resizeObserver: ResizeObserver | undefined = new ResizeObserver(debounceCalc);

  const init = async () => {
    if (!tableWrapper.value) {
      return;
    }
    await nextTick();
    antTableHead = tableWrapper.value.querySelector('.ant-table-thead');
    gpTableHead = tableWrapper.value.querySelector('.gp-table__head');
    antPagination = tableWrapper.value.querySelector('.ant-table-pagination');
    antFooter = tableWrapper.value.querySelector('.ant-table-footer');
    antTableHead && resizeObserver?.observe(antTableHead);
    gpTableHead && resizeObserver?.observe(gpTableHead);
    antPagination && resizeObserver?.observe(antPagination);
    antFooter && resizeObserver?.observe(antFooter);
    resizeObserver.observe(document.body);
    debounceCalc();
  };

  const computedScroll = computed(() => {
    if (withParentHeight) {
      return {
        y: y.value,
        ...scroll,
      };
    }
    return scroll;
  });
  return {
    computedScroll,
    init,
  };
};
