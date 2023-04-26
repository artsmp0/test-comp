/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import type {
  ButtonProps,
  CascaderProps,
  CheckboxGroupProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  RadioGroupProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TextAreaProps,
  TimePickerProps,
  TimeRangePickerProps,
  TreeSelectProps,
  UploadProps,
  InputProps,
} from 'ant-design-vue';
import type { RangePickerProps } from 'ant-design-vue/es/date-picker';
import type { RuleObject } from 'ant-design-vue/es/form';
import type { DefaultOptionType } from 'ant-design-vue/es/select';
import type { Recordable } from '../../utils';

export type Rules = Recordable<RuleObject | RuleObject[]>;
/** 搜索表单配置 */
export type SearchBar = { defaultOpen: boolean } | boolean;
/** 表单布局 */
export type FormLayout = 'inline' | 'horizontal' | 'vertical';

export const formItemProps = {
  formData: {
    type: Object,
    default: () => ({}),
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
    type: Array as PropType<Readonly<ItemConfigs>>,
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
  /** 搜索按钮loading */
  searchLoading: Boolean,
};
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type GpaFormProps = ExtractPropTypes<typeof formItemProps>;
export type dd = DeepReadonly<SelectProps & { option?: (option: DefaultOptionType) => VNode }>;
export type ItemTypePropsMap = {
  // 修复类型报错
  input: InputProps;
  inputPassword: InputProps;
  textarea: TextAreaProps;
  inputNumber: InputNumberProps;
  select: SelectProps & { option?: (option: DefaultOptionType) => VNode };
  checkbox: CheckboxGroupProps;
  // radio: RadioProps;
  radioGroup: RadioGroupProps;
  switch: SwitchProps;
  datePicker: DatePickerProps;
  rangePicker: RangePickerProps;
  timePicker: TimePickerProps;
  timeRangePicker: TimeRangePickerProps;
  rate: RateProps;
  slider: SliderProps;
  cascader: CascaderProps;
  treeSelect: TreeSelectProps;
  upload: UploadProps & { uploadContent?: VNode | (() => VNode) };
  uploadDragger: UploadProps & { uploadContent?: VNode | (() => VNode) };
  custom: object;
  operation: object;
};

export type ItemConfig<Key extends PropertyKey, Type extends string = keyof ItemTypePropsMap, Props extends any = Recordable> = {
  /** 对应字段 */
  key: Key;
  /** 标签 */
  label?: string | VNode;
  placeholder?: string;
  /** 表单类型 */
  type: Type;
  /** 表单组件的配置 */
  props?: Props;
  /** 表单 item 的配置 */
  formItemProps?: FormItemProps;
  /** 自定义表单 */
  component?: ((props: any) => JSX.Element) | any;
  /** 配置提交按钮 */
  submitButton?: {
    text?: string;
    props?: ButtonProps;
  };
  /** 配置取消按钮按钮 */
  cancelButton?: {
    text?: string;
    props?: ButtonProps;
  };
  btnWrapperStyle?: CSSProperties;
};

export type ItemConfigs<Key extends PropertyKey = string> = {
  [P in keyof ItemTypePropsMap]: ItemConfig<Key, P, ItemTypePropsMap[P]>;
}[keyof ItemTypePropsMap][];

export const formEmits = ['submit', 'reset', 'updateModel', 'cancel'];
