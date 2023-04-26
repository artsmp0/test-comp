<script lang="ts" setup>
import type { TableColumns } from '@gupo/antdv-components/es/gp-table/src/types';
import { ConfigProvider } from 'ant-design-vue';
import { ref } from 'vue';

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
const columns: TableColumns = [
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
ConfigProvider.config({
  theme: {
    primaryColor: '#f00',
  },
});

const isWithParenHeight = ref(false);
</script>

<template>
  <ConfigProvider>
    <ACheckbox v-model:checked="isWithParenHeight">是否跟随父容器宽高</ACheckbox>
    <div class="box">
      <GpaTable
        :is-with-parent-height="isWithParenHeight"
        :columns="columns"
        :list-api="getUser"
        :pagination-keys="{ current: 'current', list: 'list', pageSize: 'pageSize', total: 'pagination.total' }"
      >
        <template #bodyCell="{ record, column }">
          <ATag v-if="column.dataIndex === 'male'" :color="record.male ? 'blue' : 'red'">{{ record.male ? '男' : '女' }}</ATag>
          <template v-if="column.dataIndex === 'operation'">
            <ATag color="green">编辑</ATag>
            <AButton type="link" size="small">删除</AButton>
          </template>
        </template>
      </GpaTable>
    </div>
  </ConfigProvider>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#play {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  height: 60vh;
  max-width: 70%;
}
</style>
