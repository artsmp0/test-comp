<script lang="ts" setup>
import { CheckboxGroup, Checkbox, Popover } from 'ant-design-vue';
import { inject, computed, shallowRef, ref, unref, nextTick, watch } from 'vue';
import { DragOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import sortablejs from 'sortablejs';
import type Sortable from 'sortablejs';
import type { CheckboxChangeEvent } from 'ant-design-vue/es/checkbox/interface';
import { columnSettingKey } from '../hooks/use-columns';

const data = inject(columnSettingKey);

// 选择逻辑
const originColumns = computed(() => cloneDeep(data?.originColumns.value));
const sortColumns = shallowRef(cloneDeep(originColumns.value)); // 用于排序
const defaultCheckedList = data?.columns.value.filter(col => !col.notShow).map(col => col.dataIndex as string);
const defaultState = {
  indeterminate: false, //未全选显示
  checkAll: true,
  checkedList: defaultCheckedList as string[],
};
const state = ref(cloneDeep(defaultState));

watch(
  () => state.value.checkedList,
  (v: string[]) => {
    if (!data?.columns || !sortColumns.value) return;
    state.value.indeterminate = !!v.length && v.length < sortColumns.value.length;
    state.value.checkAll = v.length === sortColumns.value.length;
    // 使用排序列的顺序更新表格列的数据，以获得正确的显示
    data.columns.value = sortColumns.value.filter(col => v.includes(col.dataIndex as string));
  },
  { immediate: true }
);

const onCheckAllChange = (e: CheckboxChangeEvent) => {
  state.value.checkedList = e.target?.checked ? originColumns.value?.map(opt => opt.dataIndex as string) || [] : [];
};

async function handleReset() {
  state.value = cloneDeep(defaultState);
  sortIns.sort(defaultSortOrder);
  // 也会触发watch ，这边的处理要慢于watch
  await nextTick();
  if (data?.columns && originColumns.value) {
    // 重置后记得更新排序列的顺序
    sortColumns.value = data.columns.value = [...originColumns.value];
  }
}

// 排序逻辑
const $sortableWrapper = ref<InstanceType<typeof CheckboxGroup> | undefined>();
let initSort = false;
let sortIns: Sortable;
let defaultSortOrder: string[] = [];
async function handleVisibleChange() {
  if (initSort) return;
  await nextTick(() => {});
  initSort = true;
  const wrapper = unref($sortableWrapper);
  if (!wrapper) return;
  const el = wrapper.$el;
  if (!el) return;
  sortIns = sortablejs.create(el, {
    animation: 500,
    delay: 400,
    delayOnTouchOnly: true,
    handle: '.column-setting__item',
    onEnd: evt => {
      const { oldIndex, newIndex } = evt;
      if (!data || !sortColumns.value) return;
      // 一定要用排序的列，因为data.columns.value是过滤后的列
      const columns = sortColumns.value.slice() || [];
      if (oldIndex == null || newIndex == null || oldIndex === newIndex) {
        return;
      }
      if (oldIndex > newIndex) {
        columns.splice(newIndex, 0, columns?.[oldIndex]);
        columns.splice(oldIndex + 1, 1);
      } else {
        columns.splice(newIndex + 1, 0, columns?.[oldIndex]);
        columns.splice(oldIndex, 1);
      }
      // 排序结束记得更新原始列的顺序
      data.columns.value = columns.filter(c => data.columns.value.includes(c));
      sortColumns.value = columns;
    },
  });
  defaultSortOrder = cloneDeep(sortIns.toArray());
}
</script>

<template>
  <Popover
    class="column-setting"
    :trigger="'click'"
    :get-popup-container="triggerNode => triggerNode.parentElement!"
    placement="bottomRight"
    @visible-change="handleVisibleChange"
  >
    <template #title>
      <div class="column-setting__header">
        <Checkbox
          v-model:checked="state.checkAll"
          :indeterminate="state.indeterminate"
          :disabled="state.checkedList.length === originColumns?.length"
          @change="onCheckAllChange"
        >
          列展示
        </Checkbox>
        <span class="column-setting__btn" @click="handleReset">重置</span>
      </div>
    </template>
    <template #content>
      <CheckboxGroup ref="$sortableWrapper" v-model:value="state.checkedList">
        <!-- 固定列不允许拖动 -->
        <div v-for="item in originColumns" :key="item.dataIndex" class="column-setting__item">
          <DragOutlined class="column-setting__item-icon" />
          <Checkbox :value="item.dataIndex" :disabled="data?.columns.value.length === 1 && data.columns.value[0].dataIndex === item.dataIndex">
            <span class="select-none">{{ item.title }}</span>
          </Checkbox>
        </div>
      </CheckboxGroup>
    </template>
    <slot> </slot>
  </Popover>
</template>
