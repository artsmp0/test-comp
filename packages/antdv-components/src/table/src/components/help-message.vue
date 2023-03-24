<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import type { TooltipPlacement } from 'ant-design-vue/es/tooltip';

const props = withDefaults(
  defineProps<{
    helpMessage: string;
    placement?: TooltipPlacement;
  }>(),
  {
    placement: 'right',
  }
);
</script>

<template>
  <Tooltip :placement="props.placement" :get-popup-container="triggerNode => triggerNode.parentElement">
    <template #title>
      <span class="gp-table-help-message">
        <slot name="helpMessage">{{ props.helpMessage }}</slot>
      </span>
    </template>
    <slot>
      <QuestionCircleOutlined class="gp-table-help-message__icon" />
    </slot>
  </Tooltip>
</template>
