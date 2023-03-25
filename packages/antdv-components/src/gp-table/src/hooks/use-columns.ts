import { cloneDeep } from 'lodash-es';
import { computed, InjectionKey, provide, shallowRef, ShallowRef, WritableComputedRef } from 'vue';
import { GpTableProps } from '../table';
import type { TableColumns } from '../types';

export const columnSettingKey = Symbol() as InjectionKey<{
  columns: WritableComputedRef<TableColumns>;
  originColumns: ShallowRef<TableColumns>;
}>;

export function useColumn(props: GpTableProps) {
  const originColumns = shallowRef(
    cloneDeep(
      props.columns?.map(col => ({
        ...col,
        dataIndex: col?.dataIndex || col.key,
        customCell:
          col.customCell ||
          // 表示需要行合并
          ((data, index, column) => {
            if (col.needRowSpan) return { rowSpan: data[`${column?.dataIndex}RowSpan`] };
            return {};
          }),
      }))
    ) as TableColumns
  );
  const usedColumns = shallowRef(originColumns.value);

  const computedColumns = computed({
    get: () => {
      return usedColumns.value;
    },
    set: v => {
      usedColumns.value = v;
    },
  });

  provide(columnSettingKey, { columns: computedColumns, originColumns });

  return {
    computedColumns,
  };
}
