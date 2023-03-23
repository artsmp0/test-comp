<script lang="ts" setup></script>

<template>
  <Story title="Button 按钮" :layout="{ type: 'grid', width: '50%' }" icon="ic:baseline-accessibility-new">
    <Variant title="按钮类型">
      <ASpace>
        <AButton type="primary">按钮</AButton>
        <AButton type="dashed">按钮</AButton>
        <AButton type="default">按钮</AButton>
        <AButton type="ghost">按钮</AButton>
        <AButton type="link">按钮</AButton>
        <AButton type="text">按钮</AButton>
      </ASpace>
    </Variant>
    <Variant title="不可用状态" icon="material-symbols:disabled-by-default-outline">
      <AButton type="primary">Primary</AButton>
      <AButton type="primary" disabled>Primary(disabled)</AButton>
      <br />
      <AButton>Default</AButton>
      <AButton disabled>Default(disabled)</AButton>
      <br />
      <AButton type="dashed">Dashed</AButton>
      <AButton type="dashed" disabled>Dashed(disabled)</AButton>
      <br />
      <AButton type="text">Text</AButton>
      <AButton type="text" disabled>Text(disabled)</AButton>
      <br />
      <AButton type="link">Link</AButton>
      <AButton type="link" disabled>Link(disabled)</AButton>
      <br />
      <AButton danger>Danger Default</AButton>
      <AButton danger disabled>Danger Default(disabled)</AButton>
      <br />
      <AButton type="text" danger>Danger Text</AButton>
      <AButton type="text" danger disabled>Danger Text(disabled)</AButton>
      <br />
      <AButton type="link" danger>Danger Link</AButton>
      <AButton type="link" danger disabled>Danger Link(disabled)</AButton>
      <br />

      <div :style="{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }">
        <AButton ghost>Ghost</AButton>
        <AButton ghost disabled>Ghost(disabled)</AButton>
      </div>
    </Variant>
  </Story>
</template>

<docs lang="md">
# My documentation

Checkout this [cool video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)!
</docs>

<style lang="less" scoped>
.ant-btn + .ant-btn {
  margin-left: 8px;
  margin-bottom: 8px;
}
</style>
