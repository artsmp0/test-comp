<script setup lang="ts">
const shortStr = 'Lorem ipsum dolor sit';
const longStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique possimus quae doloremque rerum hic laudantium rem dolore quia, vel aliquam eligendi consequuntur fugiat officia unde, tenetur qui, optio provident exsdfsdf!';

const longChinese =
  '既然都这么说了，那是不是只要我将文本的容器设置为内联元素，然后设置其line-height为某个值，设此时要求外露n行，那么外层容器的最大高度就是n * line-height，当点击“展开“时，再把它的最大高度设置为“一个足够大的最大高度值”不就可以了吗？这样我也不用再有什么more-content的容器了，而且还能指定行数！！';
</script>

<template>
  <div class="mx-auto mt-60 w-400 flex flex-col gap-16">
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
    <div class="flex">
      <label shrink-0>点击展开（中文）：</label>
      <GpaEllipsis :text="longChinese" :line="2" placement="right" :show-tooltip="false" color="#ff8738" :expand-trigger="'click'" />
    </div>
  </div>
</template>

<style scoped></style>
