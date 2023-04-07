<script lang="ts" setup></script>

<template>
  <div>
    <div>
      <GpaTime time="2023-03-20"></GpaTime>
    </div>
    <div>
      <GpaTime time="2023-03-20" :mode="'relative'"></GpaTime>
    </div>
    <div>
      <GpaTime :time="Date.now()" :step="1" :mode="'relative'"></GpaTime>
    </div>
  </div>
</template>
