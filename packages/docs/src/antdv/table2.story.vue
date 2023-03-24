<script lang="ts" setup>
import { GpTable } from '../../../antdv-components/src';
import { TableColumns } from '../../../antdv-components/src/table/src/types';
import 'ant-design-vue/dist/antd.css';
import '../../../antdv-components/src/table/style';

interface User {
  name: string;
  age: number;
  male: boolean;
}
const getUser = (params: { pageSize: number; current: number }) => {
  console.log('params: ', params);
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
</script>

<template>
  <Story title="tavle">
    <Variant>
      <div style="height: 100vh">
        <GpTable
          title="用户列表"
          :columns="columns"
          is-with-parent-height
          :list-api="getUser"
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
    </Variant>
  </Story>
</template>
