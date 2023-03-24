import type { ColumnType } from 'ant-design-vue/es/table';

/** 接口参数 */
export type ListApi<P = any> = (params: P) => Promise<any>;
/** 表格配置数组类型 */
export type HeaderOptions = ('size' | 'fullscreen' | 'reload' | 'setting')[];
/** 获取api函数的query参数类型 */
export type GetRequestParams<T> = T extends { params: infer P1 } ? P1 : T extends { params?: infer P2 } ? P2 : never;
/** 针对api函数的请求方式是post的情况 */
export type GetRequestData<T> = T extends { data: infer P1 } ? P1 : T extends { data?: infer P2 } ? P2 : never;
/** 获取api方法的第一个参数 */
export type GetParametersOne<T extends ListApi> = Parameters<T>[0];
/** 表格列配置：支持对象键提示 */
export interface TableColumn<RecordType = any> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  /** 固定操作列名称：operation */
  dataIndex: keyof RecordType | 'operation';
  /** 表头单元格帮助信息（? 号图标 + tooltip 的形式） */
  helpMessage?: string;
  /** 是否默认隐藏列 */
  notShow?: boolean;
  /** 是否需要进行行合并 */
  needRowSpan?: boolean;
}

export type TableColumns<RecordType = any> = TableColumn<RecordType>[];

export type SortConfig = { field: { sortField: string; orderField: string }; order: { ascend: string; descend: string } };

export type PaginationKeys = { current: string; pageSize: string; list: string; total: string };

export type RowKey = string | number;
