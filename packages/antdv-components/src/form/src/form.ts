import type { FormProps } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import { Recordable } from '../../utils';

export const formItemProps = {
  formData: {
    type: Object,
  },
  /** 左侧label展示所占col：不传可以自适应 */
  labelCol: {
    type: Object as PropType<FormProps['labelCol']>,
    default: () => ({}),
  },
  /** 右侧input展示所占col */
  layout: {
    type: String as PropType<FormProps['layout']>,
  },
  /** 右侧input展示所占col */
  wrapperCol: {
    type: Object as PropType<FormProps['wrapperCol']>,
    default: () => ({}),
  },
  /** 操作按钮所占col */
  operationWrapperCol: {
    type: Object,
    default: () => ({}),
  },
  /** 提交loading */
  loading: {
    type: Boolean,
    default: () => false,
  },
  /** 是否全部需要allowClear */
  allowClear: {
    type: Boolean,
    default: true,
  },
  /** 表单配置 */
  itemConfigs: {
    type: Array as PropType<ItemConfig[]>,
    default: () => {
      return [];
    },
  },
  /** 表单验证项 */
  rules: {
    type: Object as PropType<FormProps['rules']>,
    default: () => ({}),
  },
  /** 搜索模式 */
  searchBar: {
    type: [Object, Boolean] as PropType<SearchBar>,
    default: false,
  },
};

export type GpaFormProps = ExtractPropTypes<typeof formItemProps>;

export const formInheritEvents = ['finish', 'finishFailed', 'submit', 'validate'];

export const formItemEmits = ['cancel', 'update:formData'];

export type Rules = Recordable<RuleObject | RuleObject[]>;

/** 搜索表单配置 */
export type SearchBar = { defaultOpen: boolean } | boolean;

/** 表单布局 */
export type FormLayout = 'inline' | 'horizontal' | 'vertical';

export type ItemType =
  | 'input'
  | 'input.password'
  | 'input.textarea'
  | 'inputNumber'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'datePicker'
  | 'datePicker.rangePicker'
  | 'timePicker'
  | 'timePicker.timeRangePicker'
  | 'rate'
  | 'slider'
  | 'cascader'
  | 'treeSelect'
  | 'upload'
  | 'custom'
  | 'operation'
  | 'upload.dragger';

export type ItemConfig = {
  /** 对应字段 */
  key: string;
  /** 标签 */
  label?: string | VNode;
  placeholder?: string;
  /** 表单类型 */
  type: ItemType;
  /** 表单组件的配置 */
  props?: Recordable;
  /** 表单 item 的配置 */
  formItemProps?: Recordable;
  /** 自定义验证 */
  component?: ((props: any) => JSX.Element) | any;
  /** 配置提交按钮 */
  submitButton?: {
    text?: string;
    props?: Recordable;
  };
  /** 配置取消按钮按钮 */
  cancelButton?: {
    text?: string;
    props?: Recordable;
  };
  btnWrapperStyle?: CSSProperties;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
