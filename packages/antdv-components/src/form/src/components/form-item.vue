<script setup lang="ts">
import type { ItemConfigs, ItemTypePropsMap } from '../form';
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
  type UploadProps,
  Textarea,
  InputPassword,
  Button,
  Image,
  Space,
} from 'ant-design-vue';
import { ref } from 'vue';
import type { FileType } from 'ant-design-vue/es/upload/interface';
import type { ShowSearchType } from 'ant-design-vue/es/cascader';
import type { Recordable } from '@gupo/common';

const FormItem = Form.Item;

const props = defineProps<{
  loading?: boolean;
  allowClear?: boolean;
  item: ItemConfigs[number];
  model: Recordable;
}>();

const emits = defineEmits(['updateModel', 'cancel']);

const normalComponents = {
  input: Input,
  inputPassword: InputPassword,
  textarea: Textarea,
  inputNumber: InputNumber,
  datePicker: DatePicker,
  rangePicker: DatePicker.RangePicker,
  timePicker: TimePicker,
  timeRangePicker: TimePicker.TimeRangePicker,
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
  uploadDragger: Upload.Dragger,
};

// 操作按钮区域 wrapperCol
// const formatterOperationWrapperCol = computed(() =>
//   Object.values(props.operationWrapperCol).length ? props.operationWrapperCol : { offset: props.labelCol?.span, span: props.wrapperCol?.span }
// );

const updateValue = (value: unknown) => {
  emits('updateModel', value);
};

// 定义单独配置
const generateProps = (item: ItemConfigs[number]) => {
  const formatLabel = typeof item.label === 'string' ? item.label : '';
  const placeholder = item.placeholder;
  // 部分特殊的组件需要提前加一些额外的配置
  const componentMap: Partial<Record<keyof ItemTypePropsMap, Recordable>> = {
    input: {
      placeholder: placeholder || '请输入' + formatLabel,
    },
    inputNumber: {
      placeholder: placeholder || '请输入' + formatLabel,
    },
    inputPassword: {
      placeholder: placeholder || '请输入' + formatLabel,
      autocomplete: 'off',
    },
    textarea: {
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
      placeholder: placeholder || '请选择' + formatLabel,
      showSearch: cascaderFilterOption,
    },
  };

  return {
    ...componentMap[item.type],
    name: item.key, // 表单验证需要，重置表单也需要
    ...(item?.props as object),
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
  <FormItem :name="item.key" :label="item?.label" v-bind="item?.formItemProps">
    <!-- 下面定义的component类型 -->
    <template v-if="Object.keys(normalComponents).includes(item.type)">
      <Component
        :is="normalComponents[item.type as keyof typeof normalComponents]"
        :allow-clear="allowClear"
        :value="model[item.key]"
        v-bind="generateProps(item) || {}"
        @update:value="updateValue({ [item.key]: $event })"
      />
    </template>
    <!-- radio -->
    <template v-else-if="item.type == 'radioGroup'">
      <RadioGroup :value="props.model[item.key]" v-bind="generateProps(item) || {}" @update:value="updateValue({ [item.key]: $event })">
        <!-- <template v-if="item.props && typeof item.props.options?.[0] === 'object'">
                    <RadioButton v-for="o in item.props.options" :key="" :value="o.value">{{ o.label }}</RadioButton>
                </template> -->
      </RadioGroup>
    </template>
    <!-- select -->
    <template v-else-if="item.type === 'select'">
      <Component
        :is="compositeComponents.select"
        :allow-clear="allowClear"
        :value="model[item.key]"
        v-bind="generateProps(item) || {}"
        @update:value="updateValue({ [item.key]: $event })"
      >
        <template v-if="item?.props?.option" #option="option">
          <slot :data="model" name="option" :option="option">
            <Component :is="item?.props?.option?.(option)" />
          </slot>
        </template>
      </Component>
    </template>
    <!-- switch -->
    <template v-else-if="item.type === 'switch'">
      <Component :is="compositeComponents.switch" :checked="model[item.key]" v-bind="item?.props || {}" @update:checked="updateValue({ [item.key]: $event })" />
    </template>
    <template v-else-if="item.type === 'upload'">
      <Component
        :is="compositeComponents.upload"
        :file-list="model[item.key]"
        v-bind="item?.props || {}"
        v-on="{
          preview: handlePreview,
        }"
        @update:file-list="updateValue({ [item.key]: $event })"
      >
        <slot :data="model" name="uploadContent">
          <template v-if="typeof item.props?.uploadContent === 'string'">
            {{ item?.props?.uploadContent }}
          </template>
          <template v-else>
            <Component :is="item.props?.uploadContent as any" />
          </template>
        </slot>
        <Image
          :preview="{
            visible: previewVisible,
            onVisibleChange: setVisible,
          }"
          :src="previewImage"
          :style="{ display: 'none' }"
        />
      </Component>
    </template>
    <template v-else-if="item.type === 'uploadDragger'">
      <Component
        :is="compositeComponents.uploadDragger"
        :file-list="model[item.key]"
        v-bind="item?.props || {}"
        @update:file-list="updateValue({ [item.key]: $event })"
      >
        <slot :data="model" name="uploadContent">
          <template v-if="typeof item.props?.uploadContent === 'string'">
            {{ item?.props?.uploadContent }}
          </template>
          <template v-else>
            <Component :is="item.props?.uploadContent as any" />
          </template>
        </slot>
      </Component>
    </template>
    <!-- 自定义组件 -->
    <template v-else-if="item.type === 'custom'">
      <Component :is="item.component" :model-value="model[item.key]" v-bind="item?.props || {}" @update:modelValue="updateValue({ [item.key]: $event })" />
    </template>
    <!-- 提交按钮 -->
    <Space v-else-if="item.type === 'operation'" :style="item.btnWrapperStyle">
      <Button v-if="item.cancelButton" v-bind="item.cancelButton.props" @click="emits('cancel', $event)">
        {{ item.cancelButton.text || '取消' }}
      </Button>
      <Button v-if="item.submitButton" html-type="submit" :loading="props.loading" type="primary" v-bind="item.submitButton.props">
        {{ item.submitButton.text || '提交' }}
      </Button>
    </Space>
  </FormItem>
</template>
