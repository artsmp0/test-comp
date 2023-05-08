<script lang="ts" setup>
import { Space, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { useFullscreen } from '@vueuse/core';
import { defineDict, type Nullable, type Recordable } from '../../../utils';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import type { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface';
import { SettingOutlined, ReloadOutlined, ColumnHeightOutlined, ExpandOutlined } from '@ant-design/icons-vue';
import type { HeaderOptions } from '../types';
import ColumnSetPopper from './column-set-popper.vue';
import HelpMessage from './help-message.vue';
import { onUpdated, toRef } from 'vue';

const props = defineProps<{
  container: Nullable<HTMLDivElement>;
  headerOptions: HeaderOptions;
  size: SizeType;
  keepPageReload: boolean;
  filterList: (params?: Recordable, resetPage?: boolean) => void;
}>();
const enum Events {
  'updateSize' = 'update:size',
}
type Emitter = {
  (e: Events.updateSize, size: SizeType): void;
};
const emitter = defineEmits<Emitter>();
const container = toRef(props, 'container');
const { isFullscreen, toggle } = useFullscreen(container);

const colHeightMap = defineDict(
  [
    { key: 'large', text: '默认' },
    { key: 'middle', text: '中等' },
    { key: 'small', text: '紧凑' },
  ],
  'key',
  'all'
);

const handleClickSize: MenuClickEventHandler = e => {
  emitter(Events.updateSize, e.key as SizeType);
};
onUpdated(() => {
  console.log('props.keepPageReload: ', props.keepPageReload);
});
const handleReload = () => {
  if (props.keepPageReload) {
    props.filterList(undefined, false);
  } else {
    props.filterList();
  }
};
</script>

<template>
  <Space :size="16">
    <Dropdown :trigger="'click'" placement="bottom">
      <HelpMessage :placement="'top'" help-message="密度">
        <ColumnHeightOutlined v-if="props.headerOptions.includes('size')" class="gp-table-options__icon" />
      </HelpMessage>
      <template #overlay>
        <Menu :selected-keys="[props.size!]" @click="handleClickSize">
          <MenuItem v-for="item of colHeightMap" :key="item.key"> {{ item.text }}</MenuItem>
        </Menu>
      </template>
    </Dropdown>
    <HelpMessage :placement="'top'" help-message="全屏">
      <ExpandOutlined v-if="props.headerOptions.includes('fullscreen')" class="gp-table-options__icon" @click="toggle" />
    </HelpMessage>
    <HelpMessage :placement="'top'" help-message="刷新">
      <ReloadOutlined v-if="props.headerOptions.includes('reload')" class="gp-table-options__icon" @click="handleReload" />
    </HelpMessage>
    <ColumnSetPopper>
      <HelpMessage :placement="'top'" help-message="设置">
        <SettingOutlined v-if="props.headerOptions.includes('setting')" class="gp-table-options__icon" />
      </HelpMessage>
    </ColumnSetPopper>
  </Space>
</template>
