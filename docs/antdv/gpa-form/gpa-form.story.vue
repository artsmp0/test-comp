<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { useDataSync } from './Form';
import type { GpaFormInstance } from '@gupo/antdv-components/es/form';
import { useFormConfig } from '@gupo/antdv-components/es/form';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const form = useDataSync({});

const $form = shallowRef<GpaFormInstance>();

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
  $form.value?.formIns?.validateFields?.().then(() => {
    console.log('models :>> ', form.models);
  });
};

const handleFinish = (v: typeof form.models) => {
  console.log('finish event: ', v);
};

const search1 = useFormConfig(
  {
    name: '',
    algorithm: undefined,
    type: undefined,
  },
  [
    {
      key: 'name',
      type: 'input',
      props: {
        placeholder: '请输入分组名称',
      },
    },
    {
      key: 'algorithm',
      type: 'select',
      props: {
        placeholder: '请选择关联算法',
        showSearch: true,
        options: [
          {
            label: 'LRU',
            value: 'lru',
          },
          {
            label: 'FIFO',
            value: 'fifo',
          },
        ],
      },
    },
    {
      key: 'type',
      type: 'select',
      props: {
        placeholder: '请选择分组类型',
        showSearch: true,
        options: [
          {
            label: '类型1',
            value: '1',
          },
          {
            label: '类型2',
            value: '2',
          },
        ],
      },
    },
  ]
);

const search2 = useFormConfig({ ddd: '', algorithm: undefined, type: undefined, time: undefined, time_range: [] }, [
  {
    key: 'ddd',
    type: 'input',
    props: {
      placeholder: '请输入分组名称',
    },
  },
  {
    key: 'algorithm',
    type: 'select',
    props: {
      placeholder: '请选择关联算法',
      showSearch: true,
      options: [
        {
          label: 'LRU',
          value: 'lru',
        },
        {
          label: 'FIFO',
          value: 'fifo',
        },
      ],
    },
  },
  {
    key: 'type',
    type: 'select',
    props: {
      placeholder: '请选择分组类型',
      showSearch: true,
      options: [
        {
          label: '类型1',
          value: '1',
        },
        {
          label: '类型2',
          value: '2',
        },
      ],
    },
  },
  {
    key: 'time',
    type: 'datePicker',
    props: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期',
      // style: {
      //     width: '100%',
      // },
    },
  },
  {
    key: 'time',
    type: 'datePicker',
    props: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期',
      // style: {
      //     width: '100%',
      // },
    },
  },
  {
    key: 'time_range',
    type: 'rangePicker',
    props: {
      disabledDate: (current: Dayjs) => current && current > dayjs().endOf('day'),
      valueFormat: 'YYYY-MM-DD',
      placeholder: ['请选开始时间', '请选结束时间'],
    },
  },
]);

const search3 = useFormConfig({ name: '', algorithm: undefined, type: undefined, time: undefined, time_range: [] }, [
  {
    key: 'name',
    type: 'input',
    label: '分组名称',
    props: {
      placeholder: '请输入分组名称',
    },
  },
  {
    key: 'algorithm',
    type: 'select',
    label: '分组名称',
    props: {
      placeholder: '请选择关联算法',
      showSearch: true,
      options: [
        {
          label: 'LRU',
          value: 'lru',
        },
        {
          label: 'FIFO',
          value: 'fifo',
        },
      ],
    },
  },
  {
    key: 'type',
    type: 'select',
    label: '分组类型',
    props: {
      placeholder: '请选择分组类型',
      showSearch: true,
      options: [
        {
          label: '类型1',
          value: '1',
        },
        {
          label: '类型2',
          value: '2',
        },
      ],
    },
  },
  {
    key: 'time',
    type: 'datePicker',
    label: '日期',
    props: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择日期',
    },
  },
  {
    key: 'time_range',
    type: 'timeRangePicker',
    label: '时间段',
    props: {
      valueFormat: 'HH:mm:ss',
      placeholder: ['请选开始时间', '请选结束时间'],
    },
  },
]);

const searchLoading = ref(false);
function handleSearch() {
  searchLoading.value = true;
  setTimeout(() => {
    searchLoading.value = false;
  }, 1000);
}
</script>

<template>
  <Story title="表单和搜索" auto-props-disabled icon="material-symbols:format-align-center">
    <Variant title="基础示例">
      <div class="form-wrapper">
        <GpaForm
          ref="$form"
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
        <div class="preview">
          <pre>{{ JSON.stringify(form.models, null, 4) }}</pre>
        </div>
      </div>
    </Variant>
    <Variant title="基本搜索">
      <div class="form-wrapper">
        <GpaForm
          :search-loading="searchLoading"
          search-bar
          :item-configs="search1.configs"
          :form-data="search1.models"
          @update-model="search1.updateModel"
          @search-reset="handleSearch"
          @submit="handleSearch"
        />
        <div class="preview">
          <pre>{{ JSON.stringify(search1.models, null, 4) }}</pre>
        </div>
      </div>
    </Variant>
    <Variant title="默认展开">
      <div class="form-wrapper">
        <GpaForm
          :search-loading="searchLoading"
          :search-bar="{ defaultOpen: true }"
          :item-configs="search2.configs"
          :form-data="search2.models"
          @search-reset="handleSearch"
          @submit="handleSearch"
          @update-model="search2.updateModel($event)"
        />
        <div class="preview">
          <pre>{{ JSON.stringify(search2.models, null, 4) }}</pre>
        </div>
      </div>
    </Variant>
    <Variant title="携带 Label">
      <div class="form-wrapper">
        <GpaForm
          :search-loading="searchLoading"
          :search-bar="{ defaultOpen: true }"
          :item-configs="search3.configs"
          :form-data="search3.models"
          @search-reset="handleSearch"
          @submit="handleSearch"
          @update-model="search3.updateModel($event)"
        />
        <div class="preview">
          <pre>{{ JSON.stringify(search3.models, null, 4) }}</pre>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style lang="less">
.form-wrapper {
  padding: 16px;
  background-color: #fff;
  .preview {
    color: #fff;
    background: #1f2f3f;
  }
}
</style>
