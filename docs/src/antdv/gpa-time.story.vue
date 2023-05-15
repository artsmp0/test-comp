<script lang="ts" setup>
function initState() {
  return {
    time: Date.now() - 30 * 1000,
    mode: 'relative',
    step: 1,
  };
}
</script>

<template>
  <Story title="时间格式化" icon="material-symbols:alarm-add-outline" auto-props-disabled>
    <Variant title="playground" :init-state="initState">
      <template #default="{ state }">
        <GpaTime :time="state.time" :mode="state.mode" :step="state.step" />
      </template>
      <template #controls="{ state }">
        <HstNumber v-model="state.step" title="刷新步长(s)" />
        <HstText v-model="state.time" title="时间" />
        <HstSelect
          v-model="state.mode"
          title="模式"
          :options="[
            { value: 'relative', label: '相对时间' },
            { value: 'datetime', label: '日期时间' },
            { value: 'date', label: '日期' },
          ]"
        />
      </template>
    </Variant>
  </Story>
</template>
