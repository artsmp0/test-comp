<template>
  <!--  docs-only: 仅作为文档显示，复杂组件建议单独一个文档页，更清晰易懂 -->
  <Story docs-only title="表格组件/文档" icon="material-symbols:table" auto-props-disabled> </Story>
</template>

<docs lang="md">
# 表格组件文档

> 仅列出与 antdv 不同的 API

### Props

| 参数               | 说明                                                                                                                                                              | 类型                           | 默认值                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| listApi            | 获取列表数据的接口                                                                                                                                                | (params: any) => Promise<any>  | **必填**                                                                                                     |
| columns            | 表格列配置                                                                                                                                                        | TableColumns                   | **必填**                                                                                                     |
| title              | 表格标题                                                                                                                                                          | string                         | -                                                                                                            |
| isShowHeader       | 是否显示表头                                                                                                                                                      | boolean                        | true                                                                                                         |
| headerOptions      | 是否显示表头                                                                                                                                                      | HeaderOptions                  | `['size', 'fullscreen', 'reload', 'setting']`                                                                |
| paginationKeys     | 分页参数字段名：每个项目是统一的，建议直接修改这里的默认参数，支持 . 分割字符串，因为分页参数可能是嵌套的情况 meta.total                                          | PaginationKeys                 | `{ current: 'current', pageSize: 'pageSize', list: 'list', total: 'total' }`                                 |
| sortConfig         | 排序配置：后台排序。sortField: 接口接收的排序参数字段名，orderField: 接口接收的顺序参数字段名 ascend: 接口接收的顺序参数升序值，descend: 接口接收的顺序参数降序值 | SortConfig                     | `{ field: { sortField: 'sortField', orderField: 'orderField' }, order: { ascend: 'asc', descend: 'desc' } }` |
| resolveData        | 数据二次处理                                                                                                                                                      | (data: any) => any             | -                                                                                                            |
| helpMessage        | 表格头部帮助信息                                                                                                                                                  | string                         | -                                                                                                            |
| isWithParentHeight | 是否自适应父容器高度                                                                                                                                              | boolean                        | true                                                                                                         |
| size               | 表格尺寸                                                                                                                                                          | 'small' \| 'middle' \| 'large' | 'large'                                                                                                      |
| isKeepPageReload   | 保持页码刷新                                                                                                                                                      | boolean                        | true                                                                                                         |
| isAutoFetch        | 是否自动请求数据                                                                                                                                                  | boolean                        | true                                                                                                         |
| isWithParentHeight | 是否自适应高度                                                                                                                                                    | boolean                        | -                                                                                                            |

### Events

| 事件名 | 说明         | 参数          |
| ------ | ------------ | ------------- |
| expand | 展开行事件   | `record: any` |
| change | 表格变化事件 | `params: any` |

### Slots

> 此处不包含 antdv table 自带插槽，但自带插槽仍然可以使用。注意若自定义 `headerCell` 插槽， columns -> helpMessage 属性将会失效

| 名称            | 说明                 | 参数 |
| --------------- | -------------------- | ---- |
| customOperation | 表格头部右侧操作区域 | -    |
| tableTitle      | 表格标题             | -    |
| helpMessage     | 表格头部帮助信息     | -    |

### 复杂示例

该例子对应的多字段后端排序[接口](http://10.123.234.213:9011/doc.html#/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7/4%E3%80%81%E6%95%B0%E6%8D%AE%E5%88%86%E7%B1%BB%E5%88%86%E7%BA%A7/getBindClassTagListUsingGET)

```vue
<script lang="ts" setup>
const props = defineProps<{
  queryParams?: CateTbListParams;
}>();

const $table = ref<GupoTableInstance>();
const $table2 = ref<GupoTableInstance>();

// 此处标注类型会获得更好的提示
const columns: TableColumns<TableItem> = [
  {
    title: '表名',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '所属库',
    dataIndex: 'dbName',
  },
  {
    title: '分类',
    dataIndex: 'classList',
  },
  {
    title: '标签',
    dataIndex: 'tagList',
  },

  {
    title: '是否发布',
    dataIndex: 'isPublish',
    width: 120,
    sorter: true,
    align: 'center',
  },
  {
    title: '数据量（行）',
    dataIndex: 'rowCount',
    sorter: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '占用磁盘',
    dataIndex: 'storageSize',
    sorter: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '最早数据时间',
    dataIndex: 'firstActive',
    width: 180,
  },
  {
    title: '最近更新时间',
    dataIndex: 'activeTime',
    sorter: true,
  },
];
const unConnectedColumns: TableColumns<CompareNotListItem> = [
  ...
];

let { getList: getConnectedList } = useTableListApi(APIS.get['/catalog/tb/list'], true);
let { getList: getUnConnectedList } = useTableListApi(APIS.get['/jg-bz-gl/compare/not'], true);
const getList = computed(() => {
  console.log('getList: ');
  return checked.value ? getUnConnectedList : getConnectedList;
});
watchEffect(async () => {
  await nextTick();
  $table.value?.filterList<CateTbListParams>(props.queryParams);
  $table2.value?.filterList<CateTbListParams>(props.queryParams);
});

onActivated(async () => {
  await nextTick();
  $table.value?.$el.querySelector('.ant-table-body')?.scrollTo(0, scrollTop.value);
});

// 获得选中项，包括选中的行数据和行key，记得设置 row-key、row-selection
const selectedData = computed(() => {
  const data = $table.value?.getSelectedData<TableItem>();
  if (data) {
    return {
      count: data.selectedKeys.length,
      keys: data.selectedKeys,
      rows: data.selectedData,
    };
  }
  return {
    count: 0,
    keys: [],
    rows: [],
  };
});
</script>

<template>
  <div class="h-full">
    <GupoTable
      v-show="!checked"
      ref="$table"
      class="shadow-none"
      row-key="urn"
      bordered
      is-with-parent-height
      :columns="columns"
      :list-api="getList"
      :row-selection="{ preserveSelectedRowKeys: true }"
      :pagination-keys="{ current: 'pageNum', pageSize: 'pageSize', list: 'rows', total: 'total' }"
      :title="' '"
      :sort-config="{ field: { orderField: 'isAsc', sortField: 'orderByColumn' }, order: { ascend: 'asc', descend: 'desc' } }"
      :is-auto-fetch="false"
    >
      <template #tableTitle>
        <ARadioGroup v-model:value="checked" button-style="solid">
          <ARadioButton :value="false">已接入</ARadioButton>
          <ARadioButton :value="true">未接入</ARadioButton>
        </ARadioGroup>
      </template>
      <template #customOperation>
        <AButton type="primary" @click="handleExportExcel">导出Excel</AButton>
        <AButton type="primary" danger :disabled="selectedData.count === 0" @click="handlePublish()">
          <SvgIcon name="publish" />
          发布
        </AButton>
      </template>
      <!-- 此处进行类型标注，能获得良好的类型提示 -->
      <template #headerCell="{ column }: { column: TableColumns<TableItem>[number] }">
        <HelpMessage
          v-if="column.dataIndex === 'activeTime'"
          :title="column.title as string"
          desc="MongoDB 为最新一条数据插入的时间，其他类型为数据更新时间。"
        ></HelpMessage>
      </template>
      <template #bodyCell="{ record, column }: { record: TableItem, column: TableColumns<TableItem>[number] }">
        <ASwitch
          v-if="column.dataIndex === 'isPublish'"
          v-model:checked="record.isPublish"
          :checked-value="1"
          :un-checked-value="0"
          @change="handlePublish(record)"
        ></ASwitch>
        <IconName v-if="column.dataIndex === 'name'" :is-link="true" icon-name="table" :name="record.name" @click="handleDetail(record)" />
        <IconName v-if="column.dataIndex === 'dbName'" icon-name="database" :name="record.dbName" />
        <TagList v-if="column.dataIndex === 'tagList'" :record="record" @success="$table?.filterList()" />
        <CateList v-if="column.dataIndex === 'classList'" :record="record" @success="$table?.filterList()" />
        <TableLongColumn v-if="['description', 'editablDescription', 'notes'].includes(column.dataIndex)" :column="column" :record="record" />
        <template v-if="column.dataIndex === 'storageSize'">
          {{ record['storageSizeStr'] }}
        </template>
      </template>
    </GupoTable>
  </div>
</template>
```
</docs>
