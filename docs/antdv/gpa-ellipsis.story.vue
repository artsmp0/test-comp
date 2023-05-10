<script lang="ts" setup>
const shortStr = 'Lorem ipsum dolor sit';
const longStr =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique possimus quae doloremque rerum hic laudantium rem dolore quia, vel aliquam eligendi consequuntur fugiat officia unde, tenetur qui, optio provident exsdfsdf!';

const longChinese =
  '既然都这么说了，那是不是只要我将文本的容器设置为内联元素，然后设置其line-height为某个值，设此时要求外露n行，那么外层容器的最大高度就是n * line-height，当点击“展开“时，再把它的最大高度设置为“一个足够大的最大高度值”不就可以了吗？这样我也不用再有什么more-content的容器了，而且还能指定行数！！';
</script>

<template>
  <Story title="文本省略" icon="material-symbols:alarm-add-outline" auto-props-disabled>
    <Variant title="短文本">
      <div class="content">
        <GpaEllipsis :text="shortStr" />
      </div>
    </Variant>
    <Variant title="单行省略">
      <div class="content">
        <GpaEllipsis :text="longStr" />
      </div>
    </Variant>
    <Variant title="不显示Tooltip">
      <div class="content">
        <GpaEllipsis :text="longStr" :show-tooltip="false" />
      </div>
    </Variant>
    <Variant title="弹框位置">
      <div class="content">
        <GpaEllipsis :text="longStr" placement="topLeft" />
      </div>
    </Variant>
    <Variant title="多行省略">
      <div class="content">
        <GpaEllipsis :text="longStr" :line="3" />
      </div>
    </Variant>
    <Variant title="提示框背景颜色">
      <div class="content">
        <GpaEllipsis :text="longStr" :line="3" color="#ff8738" />
      </div>
    </Variant>
    <Variant title="点击展开">
      <div class="content">
        <GpaEllipsis :text="longStr" :line="3" :show-tooltip="false" color="#ff8738" :expand-trigger="'click'" />
      </div>
    </Variant>
    <Variant title="点击展开（中文）">
      <div class="content" style="font-size: 20px">
        <GpaEllipsis :text="longChinese" :line="2" :show-tooltip="false" color="#ff8738" :expand-trigger="'click'" />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.content {
  width: 200px;
}
</style>
