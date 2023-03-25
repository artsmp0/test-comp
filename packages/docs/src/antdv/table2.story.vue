<script lang="ts" setup>
import { GpTable } from '../../../antdv-components/src';
import { TableColumns } from '../../../antdv-components/src/table/src/types';
import 'ant-design-vue/dist/antd.variable.less';
import '../../../antdv-components/src/table/style';

interface User {
  name: string;
  age: number;
  male: boolean;
}
const getUser = (params: { pageSize: number; current: number }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          list: Array.from({ length: params.pageSize }).map((_, index) => ({
            name: `我是随机名字${index * params.current}`,
            age: index,
            male: index % 2 === 0,
          })),
          pagination: {
            total: 10000,
          },
        },
      });
    }, 1000);
  });
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Column = TableColumns<User>[number];
const columns: TableColumns<User> = [
  {
    dataIndex: 'name',
    title: '姓名',
    helpMessage: '这是帮助消息',
  },
  {
    dataIndex: 'age',
    title: '年龄',
  },
  {
    dataIndex: 'male',
    title: '性别',
  },
  {
    dataIndex: 'operation',
    title: '操作',
    fixed: 'right',
    width: 150,
  },
];

function initState() {
  return {
    isWithParentHeight: false,
    title: '用户列表',
    isShowHeader: true,
    helpMessage: '用户列表头部帮助信息',
    // 'small' | 'middle' | 'large'
    size: 'large',
    isKeepPageReload: true,
  };
}
</script>

<template>
  <Story title="Gupo Table" auto-props-disabled>
    <Variant title="playground" :init-state="initState">
      <template #default="{ state }">
        <div style="height: 100vh">
          <GpTable
            :is-show-header="state.isShowHeader"
            :help-message="state.helpMessage"
            :title="state.title"
            :columns="columns"
            :is-with-parent-height="state.isWithParentHeight"
            :size="state.size"
            :list-api="getUser"
            :is-keep-page-reload="state.isKeepPageReload"
            :pagination-keys="{ current: 'current', list: 'list', pageSize: 'pageSize', total: 'pagination.total' }"
          >
            <template #bodyCell="{ record, column }: { record: User, column: Column }">
              <ATag v-if="column.dataIndex === 'male'" :color="record.male ? 'blue' : 'red'">{{ record.male ? '男' : '女' }}</ATag>
              <template v-if="column.dataIndex === 'operation'">
                <ATag color="green">编辑</ATag>
                <ATag color="green">删除</ATag>
              </template>
            </template>
          </GpTable>
        </div>
      </template>
      <template #controls="{ state }">
        <HstCheckbox v-model="state.isWithParentHeight" title="自适应父容器高度" />
        <HstCheckbox v-model="state.isShowHeader" title="显示头部" />
        <HstCheckbox v-model="state.isKeepPageReload" title="保持页码刷新" />
        <HstText v-model="state.title" title="表格标题" />
        <HstText v-model="state.helpMessage" title="表格标题帮助信息" />
        <HstSelect
          v-model="state.size"
          title="表格尺寸"
          :options="[
            { value: 'large', label: '默认' },
            { value: 'green', label: '中等' },
            { value: 'small', label: '紧凑' },
          ]"
        />
      </template>
    </Variant>
  </Story>
</template>
