import type { TableProps } from 'ant-design-vue';
import { ref, computed } from 'vue';
import type { RowKey } from '../types';

export function useSelection(propRowSelection?: TableProps['rowSelection']) {
  // 选择逻辑
  const selectedData = ref({
    selectedKeys: [] as RowKey[],
    selectedRows: [] as any[],
  });
  const onSelectedChange = (selectedKeys: RowKey[], selectedRows: any[]) => {
    selectedData.value.selectedKeys = selectedKeys;
    selectedData.value.selectedRows = selectedRows;
  };
  const rowSelection = computed<TableProps['rowSelection'] | undefined>(() => {
    return propRowSelection
      ? {
          ...propRowSelection,
          selectedRowKeys: selectedData.value.selectedKeys,
          onChange: onSelectedChange,
        }
      : undefined;
  });
  /** 主要是为了外面能有具体的类型，所以函数包裹一下 */
  const getSelectedData = <T = any>() => {
    return {
      selectedKeys: selectedData.value.selectedKeys,
      selectedData: selectedData.value.selectedRows as T[],
    };
  };
  /** 反向选中行 */
  const setSelectedData = <T = any>(keys: RowKey[], rows: T[]) => {
    selectedData.value.selectedKeys = keys;
    selectedData.value.selectedRows = rows;
  };

  const resetSelect = () => {
    selectedData.value = {
      selectedRows: [],
      selectedKeys: [],
    };
  };

  return {
    rowSelection,
    getSelectedData,
    setSelectedData,
    resetSelect,
  };
}
