<script lang="ts" setup>
import { ref } from 'vue';

const date = ref('');
const show = ref(false);

const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value: Date) => {
  show.value = false;
  date.value = formatDate(value);
};
</script>

<template>
  <Story title="日期选择" icon="ic:baseline-accessibility-new" auto>
    <Variant title="日期选择" auto-props-disabled>
      <VanCell title="选择单个日期" :value="date" @click="show = true" />
      <VanCalendar v-model:show="show" @confirm="onConfirm" />
    </Variant>
  </Story>
</template>

<docs lang="md">
# My documentation

Checkout this [cool video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)!
</docs>
