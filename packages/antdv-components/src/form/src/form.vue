<script setup lang="tsx">
import { ref, computed, reactive } from 'vue';
import { formInheritEvents, formItemEmits, formItemProps } from './form';
import FormItem from './components/form-item.vue';
import { Form, FormInstance } from 'ant-design-vue';
import SearchOpt from './components/search-opt.vue';
import { useSearchForm } from './hooks';
import { Recordable } from '../../utils';

const props = defineProps(formItemProps);
const emits = defineEmits([...formInheritEvents, ...formItemEmits]);

const $form = ref<FormInstance>();

const _formData = reactive(
  // 初始化 formItem 每一项数据，默认值为 undefined
  props.itemConfigs.reduce((res, cur) => {
    res[cur.key] = undefined;
    return res;
  }, {} as Recordable)
);
const formDataValue = computed(() => props.formData || _formData);
const updateValue = (data: Recordable) => {
  if (props.formData) {
    emits('update:formData', { ...props.formData, ...data });
  } else {
    Object.assign(_formData, data);
  }
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
      :model="formDataValue"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      v-bind="$attrs"
      :class="props.searchBar && 'gap-search-form'"
      v-on="formInheritEvents.reduce((events, eventName) => (events[eventName] = (...event:any) => emits(eventName, ...event)) && events, {} as Recordable)"
    >
      <FormItem
        v-for="(item, index) in itemConfigs"
        :key="index"
        :item="item"
        :class="props.searchBar && 'gap-search-form-item'"
        :form-data="formDataValue"
        @update:formData="updateValue"
        @cancel="$emit('cancel', formDataValue)"
      />
      <SearchOpt
        v-if="props.searchBar"
        v-model:is-open="isOpen"
        class="gap-search-form-item"
        :show-toggle="isShowToggleBtn"
        :box-width="searchBoxWidth"
        @reset="$form?.resetFields()"
        @search="$emit('submit', _formData)"
      />
      <slot name="footer" :data="formDataValue" />
    </Form>
  </div>
</template>
