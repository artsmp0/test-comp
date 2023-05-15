<script lang="ts" setup>
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
const columns = [
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
    isWithParentHeight: true,
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
  <!-- auto-props-disabled：禁用自动生成 props，复杂组件建议禁用 -->
  <!-- title用 / 分割，histoire 会自动进行匹配成组 -->
  <!-- icon可以到 https://icones.netlify.app/ 上面去找，不写也可以 -->
  <!-- 一个 story 可以有多个 Variant 组件，我们可以定义一些常用的示例，以 Button 为例：可能会有：基本用法，图标按钮... -->
  <Story title="表格组件/演示" icon="material-symbols:table" auto-props-disabled>
    <!-- initState 必须要是一个函数，返回初始状态 -->
    <Variant title="playground" :init-state="initState">
      <!-- 默认插槽可以获取到初始状态：绑定后 controls 插槽中变更了状态则会实时响应组件更新 -->
      <template #default="{ state }">
        <div style="height: 100vh">
          <GpaTable
            :is-show-header="state.isShowHeader"
            :help-message="state.helpMessage"
            :title="state.title"
            :columns="columns as any"
            :is-with-parent-height="state.isWithParentHeight"
            :size="state.size"
            :list-api="getUser"
            :is-keep-page-reload="state.isKeepPageReload"
            :pagination-keys="{ current: 'current', list: 'list', pageSize: 'pageSize', total: 'pagination.total' }"
          >
            <template #bodyCell="{ record, column }">
              <ATag v-if="column.dataIndex === 'male'" :color="record.male ? 'blue' : 'red'">{{ record.male ? '男' : '女' }}</ATag>
              <template v-if="column.dataIndex === 'operation'">
                <ATag color="green">编辑</ATag>
                <ATag color="green">删除</ATag>
              </template>
            </template>
          </GpaTable>
        </div>
      </template>
      <!-- 可以针对 state 进行变更，请注意 props 响应式不能丢失才会起效果，例如此处的 表格尺寸 -->
      <!-- 对应的空间可以上 histoire 文档去查询 -->
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
