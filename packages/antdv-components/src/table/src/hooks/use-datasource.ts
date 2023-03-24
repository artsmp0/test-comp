import type { TablePaginationConfig, TableProps } from 'ant-design-vue';
import { Recordable } from '@gupo/utils';
import type { SorterResult } from 'ant-design-vue/es/table/interface';
import { computed, getCurrentInstance, ref } from 'vue';
import { GpTableProps } from '../table';

/**
 * 计算行合并的数据
 * @param data 行合并的数据源
 * @param key 对应的key
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowSpan(data: any[], key: string) {
  const arr = data
    .reduce((result, item) => {
      if (result.indexOf(item[key]) < 0) {
        result.push(item[key]);
      }
      return result;
    }, [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .reduce((result: any[], keys: any) => {
      const children = data.filter(item => item[key] === keys);
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          [`${key}RowSpan`]: index === 0 ? children.length : 0,
        }))
      );
      return result;
    }, []);
  return arr;
}
/**
 * 专门用于处理数据相关的逻辑 hook
 */
export function useDataSource() {
  const instance = getCurrentInstance()!;
  const props = instance.props as GpTableProps;
  let pagination = props.pagination as TableProps['pagination'];
  const _dataSource = ref<Recordable[]>([]);
  const getRowSpanKey = (): string[] => {
    return props.columns?.filter(col => col.needRowSpan).map(col => col.dataIndex as string) || ([] as string[]);
  };
  const rowSpanKey = getRowSpanKey();
  const dataSource = computed<Recordable[]>({
    // 这么包一层就是有可能使用者不想要直接渲染数据源，而是需要加工一下
    get() {
      if (rowSpanKey?.length) {
        // 如果存在需要行合并的列，就需要对数据源进行处理
        rowSpanKey.forEach(key => {
          _dataSource.value = rowSpan(_dataSource.value, key);
        });
      }
      return props.resolveData?.(_dataSource) || _dataSource.value;
    },
    set(v) {
      _dataSource.value = v;
    },
  });
  const loading = ref(true);
  const total = ref(0);
  const { current, pageSize, total: pgTotalKey, list } = props.paginationKeys;
  const filterParams = ref<Recordable>({
    [current]: (pagination && (pagination as TablePaginationConfig)?.current) || 1,
    [pageSize]: (pagination && (pagination as TablePaginationConfig)?.pageSize) || 100,
  });

  /**
   * 获取列表数据
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function getList(sorter?: SorterResult<Recordable> | SorterResult<Recordable>[], filters?: any) {
    loading.value = true;
    let sorterParams = {} as any;
    const sortField = props.sortConfig.field.sortField;
    const orderField = props.sortConfig.field.orderField;
    const order = props.sortConfig.order;
    if (Array.isArray(sorter)) {
      // 支持多列排序
      sorterParams = sorter
        .sort((a, b) => (a!.column!.sorter as Recordable).multiple - (b!.column!.sorter as Recordable).multiple)
        .reduce((res, cur) => {
          return cur.order
            ? {
                [sortField]: cur.field + ',' + (res[sortField] || ''),
                [orderField]: order[cur.order] + ',' + (res[orderField] || ''),
              }
            : res;
        }, {} as Recordable);
    } else {
      sorterParams = sorter?.order && { [sortField]: sorter.field, [orderField]: order[sorter.order] };
    }
    /**
       * 排序参数举例子：
       {
          "pageNum": 2,
          "pageSize": 10,
          "orderByColumn": "storageSize,rowCount,",
          "isAsc": "asc,asc,"
       }
       */
    const finalParams = {
      ...sorterParams,
      ...filterParams.value,
    };

    const { data, err } = await props.listApi!(finalParams);
    loading.value = false;
    if (err) {
      // 取消请求时，loading状态不消失，因为接口重复请求了才会取消
      if (err.code === 'ERR_CANCELED') {
        loading.value = true;
      }
      return;
    }
    // 这里已经没法优化类型了。除非接口统一
    _dataSource.value = data[list];
    if (_dataSource.value.length === 0 && filterParams.value[current] > 1) {
      // 解决：批量删除时，整页被删除，保持参数筛选的时候会出现空。同样他也会解决删除这一页的最后一条的时候，回到上一页
      filterParams.value[current]--;
      getList();
    }
    // total 可能是以 . 分割的字符串，所以要用 reduce 来获取
    const getTotal = () => {
      const keys = pgTotalKey.split('.');
      return keys.reduce((res, cur) => {
        return res[cur];
      }, data);
    };
    total.value = getTotal();
  }

  // 分页变化相关逻辑
  const computedPagination = computed<TableProps['pagination']>({
    get: () => {
      return pagination
        ? {
            total: total.value,
            showTotal: (total: number) => `总计${total}条`,
            showSizeChanger: true,
            'show-quick-jumper': true,
            // 不能覆盖分页参数
            ...pagination,
            current: filterParams.value[current],
            pageSize: filterParams.value[pageSize],
          }
        : false;
    },
    set(v) {
      pagination = v;
    },
  });

  /**
   * 重置页码不刷新列表
   * @param {number} newCurrent
   */
  const resetPageNum = (newCurrent = 1) => {
    filterParams.value[current] = newCurrent;
  };

  /**
   * 查询列表：啥都不传就是刷新了，传 undefined 和 false 就是保持分页刷新
   * @param params 查询参数
   * @param resetPage 是否要重置页码
   */
  const filterList = async <T = any>(params?: T, resetPage = true) => {
    filterParams.value = params
      ? {
          ...params,
          // 如果传了就用用户的分页设置
          [current]: (params as Recordable)[current] || filterParams.value[current],
          [pageSize]: (params as Recordable)[pageSize] || filterParams.value[pageSize],
        }
      : filterParams.value;
    resetPage && resetPageNum();
    getList();
  };

  const handleChange: TableProps['onChange'] = ({ current: cur, pageSize: pSize }, filters, sorter) => {
    // 改变的时候也动态改变查询参数里的分页信息
    filterParams.value[current] = cur;
    filterParams.value[pageSize] = pSize;
    getList(sorter, filters);
    instance.emit('change', { current: cur, pageSize: pSize });
  };
  props.isAutoFetch && getList();

  return {
    /** 表格数据 */
    dataSource,
    /** 表格 loading */
    loading,
    /** 表格总数据量 */
    total,
    /** 动态计算分页参数 */
    computedPagination,
    /** 用于查询列表 */
    filterList,
    /** 监听表格变化 */
    handleChange,
  };
}
