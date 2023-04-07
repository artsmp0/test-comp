<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useDataSync } from './index.jsx';
import { onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { GpaFormInstance } from '../../../packages/antdv-components/src/form';

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

// 测试组件更新
// setInterval(() => {
//     params.addressOption = [];
// }, 2000);
// function onTestReRender() {
//     console.log('onTest: ', params.addressOption);
// }
</script>

<template>
  <div class="page-container">
    <AButton type="primary" class="link" @click="openLink"> 查看文档 </AButton>
    <div class="p-16 w-1/2 m-auto bg-white">
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
      <!-- 自定义按钮 -->
      <AButton type="primary" @click="customSubmit">自定义提交</AButton>
    </div>
  </div>
</template>
