<script setup lang="ts">
const shortStr = 'Lorem ipsum dolor sit';
const longStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique possimus quae doloremque rerum hic laudantium rem dolore quia, vel aliquam eligendi consequuntur fugiat officia unde, tenetur qui, optio provident ex!';
</script>

<template>
  <div class="mx-auto mt-20 w-400 flex flex-col gap-16">
    <div class="flex">
      <label shrink-0>短文本：</label>
      <GpaEllipsis :text="shortStr" />
    </div>
    <div class="flex">
      <label shrink-0>单行省略：</label>
      <GpaEllipsis :text="longStr" placement="right" />
    </div>
    <div class="flex">
      <label shrink-0>不显示Tooltip：</label>
      <GpaEllipsis :text="longStr" placement="right" :show-tooltip="false" />
    </div>
    <div class="flex">
      <label shrink-0>弹框位置：</label>
      <GpaEllipsis :text="longStr" placement="topLeft" />
    </div>
    <div class="flex">
      <label shrink-0>多行省略：</label>
      <GpaEllipsis :text="longStr" :line="3" placement="right" />
    </div>
    <div class="flex">
      <label shrink-0>提示框背景颜色：</label>
      <GpaEllipsis :text="longStr" :line="3" placement="right" color="#ff8738" />
    </div>
    <div class="flex">
      <label shrink-0>点击展开：</label>
      <GpaEllipsis :text="longStr" :line="3" placement="right" :show-tooltip="false" color="#ff8738" :expand-trigger="'click'" />
    </div>
  </div>
</template>

<style scoped></style>
