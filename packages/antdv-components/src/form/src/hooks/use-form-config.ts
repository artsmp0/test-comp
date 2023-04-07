/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RuleObject } from 'ant-design-vue/es/form';
import { ShallowReactive, reactive, watchEffect } from 'vue';
import type { DeepPartial, ItemConfig, Rules } from '../form';
import { Recordable } from '../../../utils';

// 和下面的高级类型达成相同效果
// type GetKeys<Arr extends Array<{ key: string }>> = Arr extends [{ key: infer Key extends string }, ...infer Rest extends Array<{ key: string }>]
//     ? Key | GetKeys<Rest>
//     : never;

// type GenObj<Keys extends keyof any> = {
//     [Key in Keys]: any;
// };

/** 从对象数组中获取 key 字段对应的值组成的新对象 */
type GenObj<T extends Readonly<Array<{ key: string }>>> = {
  [P in T[number]['key']]: any;
};

/**
 * 使用 GupoForm 时提供类型提示，自动生成 form model 及其类型，以及rules编写时提示 cmd+i / cmd+.
 * @param itemConfigs 如果不需要动态增减表单项，建议使用函数的方式，写起来更方便。表单配置:支持传 shallowReactive 形式，用于动态增减表单项，若存在异步数据，则需要配合 watch 与 updateItemConfig 进行异步数据更新
 * @param rules 表单验证规则
 * @param initialVal 表单初始值
 */
function useFormConfig<T extends Readonly<ItemConfig[]> = ItemConfig[]>(
  itemConfigs: () => T,
  rules?: { [P in keyof GenObj<T>]?: RuleObject | RuleObject[] },
  initialVal?: Partial<GenObj<T>>
): { itemConfigs: () => ItemConfig[]; formData: Partial<GenObj<T>>; rules: Rules };
function useFormConfig<T extends Readonly<ItemConfig[]> = ItemConfig[]>(
  itemConfigs: ShallowReactive<T>,
  rules?: { [P in keyof GenObj<T>]?: RuleObject | RuleObject[] },
  initialVal?: Partial<GenObj<T>>
): {
  itemConfigs: ShallowReactive<ItemConfig[]>;
  formData: Partial<GenObj<T>>;
  rules: Rules;
  setValue: (value: Partial<GenObj<T>>) => void;
  updateItemConfig: <N extends keyof T>(idx: N, item: DeepPartial<T[N]>) => void;
};
function useFormConfig<T extends ItemConfig[]>(itemConfigs: (() => T) | ItemConfig[], rules?: Recordable, initialVal?: Recordable): any {
  const formData = reactive<Recordable>({});
  if (typeof itemConfigs === 'function') {
    itemConfigs().forEach(item => {
      if (item.key !== '') {
        formData[item.key] = initialVal?.[item.key] || item.props?.multiple ? [] : undefined;
      }
    });
  } else {
    itemConfigs.forEach(item => {
      if (item.key !== '') {
        formData[item.key] = initialVal?.[item.key] || item.props?.multiple ? [] : undefined;
      }
    });
  }

  const setValue = <T extends typeof initialVal>(value: T) => {
    Object.assign(formData, value);
  };

  watchEffect(() => {
    console.log('123');
  });
  /** 当需要动态增减表单项的时候，必须使用 shallowReactive 模式，这个方法就可以用来设置下拉框异步加载的数据了 */
  const updateItemConfig = (idx: number, item: Partial<ItemConfig>) => {
    if (typeof itemConfigs === 'function') return;
    itemConfigs[idx] = {
      ...itemConfigs[idx],
      ...item,
      props: {
        ...itemConfigs[idx].props,
        ...item.props,
      },
    };
  };

  return {
    itemConfigs,
    formData,
    rules,
    setValue,
    updateItemConfig,
  };
}
export { useFormConfig };
