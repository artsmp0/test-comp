<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { reactive, ref, onMounted } from 'vue';
import { useDataSync } from './Form';
import type { GpaFormInstance } from '@gupo/antdv-components/es/form';

// 需要用到监听方法，传参选项传参params
const params = reactive({
  addressOption: [] as any,
  uploadChange: (info: any) => onChange(info),
  uploadLoading: false,
  imageUrl: '',
});

const { addForm } = useDataSync(params);

const $globalForm = ref<GpaFormInstance>();

onMounted(() => {
  getConfigDetails();
  getOption();
});
const validate = (...e: any) => {
  console.log('addForm.validate :>> ', ...e);
};
const customSubmit = () => {
  $globalForm.value?.formIns?.validateFields?.().then(() => {
    console.log('addForm.formData :>> ', addForm.formData);
  });
};

const onFinish = () => {
  console.log('addForm.formData :>> ', addForm.formData);
};

const onCancel = () => {
  console.log('已取消');
};

/** 获取详情赋值：也可以在 useFormConfig 时传递初始值：initialValue */
const getConfigDetails = () => {
  // 接口返回数据
  let data = { name: 11, 没用字段: 11 };

  const { name } = data;
  Object.assign(addForm.formData, { name });
};

/** 异步获取下拉框的值 */
const getOption = () => {
  setTimeout(() => {
    params.addressOption = [
      {
        name: '安徽',
        code: 'anhui',
      },
      {
        name: '浙江',
        code: 'zhejiang',
      },
    ];
  }, 2000);
};

const onChange = (info: any) => {
  if (info.file.status === 'uploading') {
    params.uploadLoading = true;
    return;
  }
  if (info.file.status === 'done') {
    params.imageUrl = info.file.response.data.url;
    params.uploadLoading = false;
  }

  if (info.file.status === 'error') {
    params.uploadLoading = false;
    message.error('upload error');
  }
};

const openLink = () => {
  window.open('https://release.group-ds.com/dev-vue3-vite-template-jsadminantvdocs/pages/ecosystem-form.html');
};
</script>

<template>
  <Story title="表单和搜索" icon="material-symbols:format-align-center" auto-props-disabled>
    <Variant title="示例demo">
      <GpaForm
        ref="$globalForm"
        :rules="addForm.rules"
        :item-configs="addForm.itemConfigs()"
        :form-data="addForm.formData"
        :label-col="{ span: 4 }"
        @update:formData="Object.assign(addForm.formData, $event)"
        @finish="onFinish"
        @cancel="onCancel"
        @validate="validate"
      />
    </Variant>
  </Story>
</template>
