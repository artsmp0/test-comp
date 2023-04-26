<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { useDataSync } from './index.jsx';
import type { GpaFormInstance } from '../../../packages/antdv-components/src/form';
import { shallowRef } from 'vue';

const form = useDataSync({});

const $globalForm = shallowRef<GpaFormInstance>();

/** 获取详情赋值：也可以在 useFormConfig 时传递初始值：initialValue */
const getConfigDetails = () => {
  // 接口返回数据
  let data = { name: 'artsmp', 没用字段: 11 };

  const { name } = data;
  form.updateModel({
    input: name,
  });
};

/** 异步获取下拉框的值 */
const getOption = () => {
  setTimeout(() => {
    form.updateConfigs('select', {
      props: {
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
          },
          {
            label: '安徽',
            value: 'anhui',
          },
        ],
      },
    });
  }, 2000);
};

getConfigDetails();
getOption();

const openLink = () => {
  window.open('https://release.group-ds.com/dev-vue3-vite-template-jsadminantvdocs/pages/ecosystem-form.html');
};

const handleCancel = () => {
  console.log('handleCancel');
};

const customSubmit = () => {
  $globalForm.value?.formIns?.validateFields?.().then(() => {
    console.log('models :>> ', form.models);
  });
};

const handleFinish = (v: typeof form.models) => {
  console.log('finish event: ', v);
};
</script>

<template>
  <div class="page-container">
    <AButton type="primary" class="link" @click="openLink"> 查看文档 </AButton>
    <div class="p-16 w-1/2 m-auto bg-white">
      <GpaForm
        ref="$globalForm"
        :rules="form.rules"
        :item-configs="form.configs"
        :form-data="form.models"
        :label-col="{ span: 4 }"
        @update-model="form.updateModel($event)"
        @cancel="handleCancel"
        @finish="handleFinish"
      />
      <!-- 自定义按钮 -->
      <AButton type="primary" @click="customSubmit">自定义提交</AButton>
    </div>
  </div>
</template>
