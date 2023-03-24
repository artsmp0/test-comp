import { ExtractPropTypes, PropType } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { HeaderOptions, PaginationKeys, SortConfig, TableColumns } from './types';

export const tableProps = {
  listApi: {
    type: Function as PropType<(...args: any[]) => Promise<any>>,
    required: true,
  },
  /**
   * @description 表格标题
   * @default ''
   */
  title: {
    type: String as PropType<string>,
    default: '',
  },
  /**
   * @description 标题帮助信息
   */
  helpMessage: {
    type: String as PropType<string>,
  },
  /**
   * @description 控制头部是否显示
   * @default true
   */
  isShowHeader: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * @description 右侧操作图标按钮
   */
  headerOptions: {
    type: Array as PropType<HeaderOptions>,
    default: () => ['size', 'fullscreen', 'reload', 'setting'],
  },
  /**
   * @description 表格列配置，建议使用 TableColumns 类型，并传入 Record 类型
   */
  columns: {
    type: Array as PropType<TableColumns>,
    required: true,
  },
  /**
   * @description 参考 antdv table
   */
  scroll: {
    type: Object as PropType<TableProps['scroll']>,
  },
  /**
   * @description 分页参数字段名：每个项目是统一的，建议直接修改这里的默认参数，支持 . 分割字符串，因为分页参数可能是嵌套的情况 meta.total
   */
  paginationKeys: {
    type: Object as PropType<PaginationKeys>,
    default: () => ({ current: 'current', pageSize: 'pageSize', list: 'list', total: 'total' }),
  },
  /**
   * @description 参考 antdv table
   */
  pagination: {
    type: Object as PropType<TableProps['pagination']>,
    default: () => ({}),
  },
  /**
   * @description 参考 antdv table
   */
  rowKey: {
    type: [String, Function] as PropType<TableProps['rowKey']>,
  },
  /**
   * @description 排序配置：后台排序
   * @property field: sortField: 接口接收的排序参数字段名，orderField: 接口接收的顺序参数字段名
   * @property order: ascend: 接口接收的顺序参数升序值，descend: 接口接收的顺序参数降序值
   */
  sortConfig: {
    type: Object as PropType<SortConfig>,
    default: () => ({ field: { sortField: 'sortField', orderField: 'orderField' }, order: { ascend: 'asc', descend: 'desc' } }),
  },
  /**
   * @description 参考 antdv table
   */
  size: {
    type: String as PropType<TableProps['size']>,
  },
  /**
   * @description 参考 antdv table
   */
  rowSelection: {
    type: Object as PropType<TableProps['rowSelection']>,
  },
  /**
   * @description 是否保持分页刷新
   */
  isKeepPageReload: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * @description 数据二次处理
   */
  resolveData: {
    type: Function as PropType<(data: any) => any>,
  },
  /**
   * @description 是否自动请求数据
   */
  isAutoFetch: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /**
   * @description 是否自适应高度
   */
  isWithParentHeight: {
    type: Boolean as PropType<boolean>,
  },
};

export type GpTableProps = ExtractPropTypes<typeof tableProps>;

export const gpTableEmits = {
  expand: (record: any) => Boolean(record),
  change: (params: any) => Boolean(params),
};
export type GpTableEmits = typeof gpTableEmits;
