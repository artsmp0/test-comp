<script setup lang="ts">
import { formItemEmits, formItemProps, type ItemConfig, type ItemType } from '../form';
import {
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
  RadioGroup,
  RadioButton,
  type UploadProps,
  Button,
  Image,
} from 'ant-design-vue';
import { computed, ref, type PropType } from 'vue';
import type { FileType } from 'ant-design-vue/es/upload/interface';
import type { ShowSearchType } from 'ant-design-vue/es/cascader';
import { Recordable } from '../../../utils';

const FormItem = Form.Item;

const props = defineProps({
  ...formItemProps,
  item: {
    type: Object as PropType<ItemConfig>,
    default: () => ({}),
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits([...formItemEmits]);

const normalComponents: Recordable = {
  input: Input,
  'input.password': Input.Password,
  'input.textarea': Input.TextArea,
  inputNumber: InputNumber,
  datePicker: DatePicker,
  'datePicker.rangePicker': DatePicker.RangePicker,
  timePicker: TimePicker,
  'timePicker.timeRangePicker': TimePicker.TimeRangePicker,
  rate: Rate,
  slider: Slider,
  treeSelect: TreeSelect,
  checkbox: Checkbox.Group,
  cascader: Cascader,
};

const compositeComponents = {
  select: Select,
  switch: Switch,
  upload: Upload,
  'upload.dragger': Upload.Dragger,
};

// 操作按钮区域 wrapperCol
const formatterOperationWrapperCol = computed(() =>
  Object.values(props.operationWrapperCol).length ? props.operationWrapperCol : { offset: props.labelCol?.span, span: props.wrapperCol?.span }
);

const updateValue = (value: unknown) => {
  emits('update:formData', value);
};

// 定义单独配置
const generateProps = (item: ItemConfig) => {
  const formatLabel = typeof item.label === 'string' ? item.label : '';
  const placeholder = item.placeholder;
  // 部分特殊的组件需要提前加一些额外的配置
  const componentMap: Partial<Record<ItemType, Recordable>> = {
    input: {
      placeholder: placeholder || '请输入' + formatLabel,
    },
    inputNumber: {
      placeholder: placeholder || '请输入' + formatLabel,
    },
    'input.password': {
      placeholder: placeholder || '请输入' + formatLabel,
      autocomplete: 'off',
    },
    'input.textarea': {
      placeholder: placeholder || '请输入' + formatLabel,
    },
    treeSelect: {
      placeholder: placeholder || '请选择' + formatLabel,
    },
    select: {
      placeholder: placeholder || '请选择' + formatLabel,
      filterOption: selectFilterOption,
    },
    cascader: {
      placeholder: '请选择' + formatLabel,
      showSearch: item?.props?.showSearch ? cascaderFilterOption : false,
    },
  };
  return {
    ...componentMap[item.type],
    name: item.key, // 表单验证需要，重置表单也需要
    ...item?.props,
  };
};

// select筛选选项
const selectFilterOption = (input: string, option: Recordable) => {
  return Object.values(option).join().toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//cascader筛选
const cascaderFilterOption: ShowSearchType['filter'] = (inputValue, path) => {
  return path.some((option: Recordable) => Object.values(option).join().toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};

// 图片预览
const previewVisible = ref(false);
const previewImage = ref('');
const handlePreview = async (file: Required<Exclude<UploadProps['fileList'], undefined>[number]>) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  setVisible(true);
};
const getBase64 = (file: FileType) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error: unknown) => reject(error);
  });
};
const setVisible = (value: boolean) => {
  previewVisible.value = value;
};
</script>

<template>
  <FormItem
    :name="item.key"
    :wrapper-col="item.type === 'operation' || !item.label ? formatterOperationWrapperCol : { ...wrapperCol }"
    :label="item?.label"
    v-bind="item?.formItemProps"
  >
    <!-- 下面定义的component类型 -->
    <template v-if="Object.keys(normalComponents).includes(item.type)">
      <Component
        :is="normalComponents[item.type]"
        :value="formData[item.key]"
        :allow-clear="allowClear"
        v-bind="generateProps(item) || {}"
        @update:value="updateValue({ [item.key]: $event })"
      />
    </template>
    <!-- radio -->
    <template v-else-if="item.type == 'radio'">
      <RadioGroup :value="props.formData[item.key]" v-bind="generateProps(item) || {}" @update:value="updateValue({ [item.key]: $event })">
        <RadioButton v-for="o in item.props?.options" :key="o.value" :value="o.value">{{ o.label }}</RadioButton>
      </RadioGroup>
    </template>
    <!-- select -->
    <template v-else-if="item.type === 'select'">
      <Component
        :is="compositeComponents.select"
        :value="formData[item.key]"
        :allow-clear="allowClear"
        v-bind="generateProps(item) || {}"
        @update:value="updateValue({ [item.key]: $event })"
        ><template v-if="item?.props?.option" #option="option">
          <slot name="option" :option="option" :data="formData">
            <Component :is="item?.props?.option?.(option)" />
          </slot> </template
      ></Component>
    </template>
    <!-- switch -->
    <template v-else-if="item.type === 'switch'">
      <Component
        :is="compositeComponents.switch"
        :checked="formData[item.key]"
        v-bind="item?.props || {}"
        @update:checked="updateValue({ [item.key]: $event })"
      />
    </template>
    <template v-else-if="item.type === 'upload'">
      <Component
        :is="compositeComponents.upload"
        :file-list="formData[item.key]"
        v-bind="item?.props || {}"
        @update:file-list="updateValue({ [item.key]: $event })"
        v-on="{
          preview: item.props?.onPreview || handlePreview,
        }"
      >
        <slot name="uploadContent" :data="formData">
          <template v-if="typeof item.props?.uploadContent === 'string'">
            {{ item?.props?.uploadContent }}
          </template>
          <template v-else>
            <Component :is="item.props?.uploadContent" v-bind="item.props?.uploadContentProps || {}" />
          </template>
        </slot>
        <Image
          :style="{ display: 'none' }"
          :preview="{
            visible: previewVisible,
            onVisibleChange: setVisible,
          }"
          :src="previewImage"
        />
      </Component>
    </template>
    <template v-else-if="item.type === 'upload.dragger'">
      <Component
        :is="compositeComponents['upload.dragger']"
        :file-list="formData[item.key]"
        v-bind="item?.props || {}"
        @update:file-list="updateValue({ [item.key]: $event })"
      >
        <slot name="uploadContent" :data="formData">
          <template v-if="typeof item.props?.uploadContent === 'string'">
            {{ item?.props?.uploadContent }}
          </template>
          <template v-else>
            <Component :is="item.props?.uploadContent" v-bind="item.props?.uploadContentProps || {}" />
          </template>
        </slot>
      </Component>
    </template>
    <!-- 自定义组件 -->
    <template v-else-if="item.type === 'custom'">
      <Component :is="item.component" :model-value="formData[item.key]" v-bind="item?.props || {}" @update:modelValue="updateValue({ [item.key]: $event })" />
    </template>
    <!-- 提交按钮 -->
    <div v-else-if="item.type === 'operation'" :style="item.btnWrapperStyle">
      <Button v-if="item.cancelButton" v-bind="item.cancelButton.props" @click="$emit('cancel', $event)">
        {{ item.cancelButton.text || '取消' }}
      </Button>
      <Button v-if="item.submitButton" type="primary" html-type="submit" :loading="loading" v-bind="item.submitButton.props">
        {{ item.submitButton.text || '提交' }}
      </Button>
    </div>
  </FormItem>
</template>
