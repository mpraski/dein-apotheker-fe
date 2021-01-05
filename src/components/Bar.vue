<template>
  <div class="bar-body">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Bar extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.bar-body {
  @include horizontal-list;

  padding: $marginSmall $marginMedium;

  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    &.left {
      justify-content: flex-start;
    }

    &.right {
      justify-content: flex-end;
    }
  }
}
</style>
