<script lang="ts" setup></script>

<template>
  <Story
    title="Button 按钮"
    :layout="{ type: 'grid', width: '50%' }"
    icon="ic:baseline-accessibility-new"
  >
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
      <a-button type="primary">Primary</a-button>
      <a-button type="primary" disabled>Primary(disabled)</a-button>
      <br />
      <a-button>Default</a-button>
      <a-button disabled>Default(disabled)</a-button>
      <br />
      <a-button type="dashed">Dashed</a-button>
      <a-button type="dashed" disabled>Dashed(disabled)</a-button>
      <br />
      <a-button type="text">Text</a-button>
      <a-button type="text" disabled>Text(disabled)</a-button>
      <br />
      <a-button type="link">Link</a-button>
      <a-button type="link" disabled>Link(disabled)</a-button>
      <br />
      <a-button danger>Danger Default</a-button>
      <a-button danger disabled>Danger Default(disabled)</a-button>
      <br />
      <a-button type="text" danger>Danger Text</a-button>
      <a-button type="text" danger disabled>Danger Text(disabled)</a-button>
      <br />
      <a-button type="link" danger>Danger Link</a-button>
      <a-button type="link" danger disabled>Danger Link(disabled)</a-button>
      <br />

      <div :style="{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }">
        <a-button ghost>Ghost</a-button>
        <a-button ghost disabled>Ghost(disabled)</a-button>
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
