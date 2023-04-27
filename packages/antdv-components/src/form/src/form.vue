<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { formItemProps } from './form';
import FormItem from './components/form-item.vue';
import type { FormInstance } from 'ant-design-vue';
import { Form } from 'ant-design-vue';
import SearchOpt from './components/search-opt.vue';
import { useSearchForm } from './hooks';
import type { Recordable } from '../../utils';

const props = defineProps(formItemProps);
const emits = defineEmits(['submit', 'searchReset', 'updateModel', 'cancel', 'finish']);

const $form = shallowRef<FormInstance>();

const model = computed(() => props.formData);

const handleUpdateValue = (data: Recordable) => {
  emits('updateModel', { ...props.formData, ...data });
};

const handleReset = () => {
  $form.value?.resetFields();
  emits('searchReset');
};

const { searchLayout, isOpen, itemConfigs, searchWrapperStyle, isShowToggleBtn, searchBoxWidth } = useSearchForm(props, $form);

defineExpose({
  formIns: $form,
});
</script>

<template>
  <div :class="{ 'gpa-search-wrapper': props.searchBar }" :style="searchWrapperStyle">
    <Form
      ref="$form"
      :layout="searchLayout"
      :label-wrap="true"
      :model="model"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      v-bind="$attrs"
      :class="props.searchBar && 'gap-search-form'"
      @finish="emits('finish', $event)"
      @submit="emits('submit', $event)"
    >
      <FormItem
        v-for="(item, index) in itemConfigs"
        :key="index"
        :loading="props.loading"
        :allow-clear="props.allowClear"
        :item="item"
        :class="props.searchBar && 'gap-search-form-item'"
        :model="model"
        @update-model="handleUpdateValue"
        @cancel="$emit('cancel', model)"
      />
      <SearchOpt
        v-if="props.searchBar"
        v-model:is-open="isOpen"
        class="gap-search-form-item"
        :show-toggle="isShowToggleBtn"
        :box-width="searchBoxWidth"
        :search-loading="props.searchLoading"
        @reset="handleReset"
        @search="emits('submit', props.formData)"
      />
      <slot name="footer" :data="model" />
    </Form>
  </div>
</template>
