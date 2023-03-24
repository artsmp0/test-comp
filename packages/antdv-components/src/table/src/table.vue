<script lang="ts" setup>
import { ColumnsType } from 'ant-design-vue/es/table';
import { ref, watch } from 'vue';
import { useColumn } from './hooks/use-columns';
import { useDataSource } from './hooks/use-datasource';
import { useScroll } from './hooks/use-scroll';
import { useSelection } from './hooks/use-selection';
import { gpTableEmits, tableProps } from './table';
import { Table, Divider } from 'ant-design-vue';
import HelpMessage from './components/help-message.vue';
import Options from './components/Options.vue';

const props = defineProps(tableProps);

const emits = defineEmits(gpTableEmits);

const $tableContainer = ref<HTMLDivElement>();
const size = ref(props.size);

const { computedColumns } = useColumn(props);
const { dataSource, loading, computedPagination, filterList, handleChange } = useDataSource();
const { getSelectedData, setSelectedData, rowSelection, resetSelect } = useSelection(props.rowSelection);

// 表格自适应父容器高度
const { computedScroll, init } = useScroll({ scroll: props.scroll, withParentHeight: props.isWithParentHeight, tableWrapper: $tableContainer });
const stop = watch(dataSource, v => {
  if (!props.isWithParentHeight) {
    stop();
    return;
  }
  if (v.length > 0) {
    init();
  }
});

defineExpose({
  dataSource,
  /** 筛选列表 */
  filterList,
  /** 获取已选择数据 */
  getSelectedData,
  /** 清空选择 */
  resetSelect,
  /** 选中行 */
  setSelectedData,
  $tableContainer,
});
</script>

<template>
  <div ref="$tableContainer" :class="{ 'gp-table': true, 'gp-table--h-full': props.isWithParentHeight }">
    <div v-if="props.isShowHeader" class="gp-table__head">
      <div class="gp-table__title">
        <slot name="tableTitle">
          <span>{{ title }}</span>
        </slot>
        <HelpMessage v-if="props.helpMessage" :help-message="props.helpMessage">
          <template #helpMessage>
            <slot name="helpMessage"></slot>
          </template>
        </HelpMessage>
      </div>
      <div>
        <slot name="customOperation"></slot>
        <Divider v-if="$slots.customOperation" :type="'vertical'" />
        <Options
          v-model:size="size"
          :container="$tableContainer"
          :keep-page-reload="props.isKeepPageReload"
          :header-options="props.headerOptions"
          :filter-list="filterList"
          :columns="computedColumns"
        />
      </div>
    </div>
    <Table
      v-bind="$attrs"
      :columns="computedColumns as ColumnsType<any>"
      :data-source="dataSource"
      :loading="loading"
      :scroll="computedScroll"
      :pagination="computedPagination"
      :size="size"
      :row-selection="rowSelection"
      :row-key="props.rowKey"
      @change="handleChange"
      @expand="(_, record) => emits('expand', record)"
    >
      <template v-for="(_, slotName) of $slots" :key="slotName" v-slot:[slotName]="data">
        <slot :name="slotName" v-bind="data || {}"></slot>
      </template>
      <template #headerCell="{ column, title }">
        <slot v-bind="{ title, column }" name="headerCell">
          <span>{{ title }}</span>
          <HelpMessage v-if="column.helpMessage" :help-message="column.helpMessage"> </HelpMessage>
        </slot>
      </template>
      <template #bodyCell="{ text, record, index, column }">
        <slot v-bind="{ text, record, index, column }" name="bodyCell"></slot>
      </template>
    </Table>
  </div>
</template>
