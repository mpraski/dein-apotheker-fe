<template>
  <header class="bar-body">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Bar extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.bar-body {
  @include horizontal-list(space-between);

  flex: none;
  align-items: center;
  padding: $marginSmall $marginMedium;

  > div {
    @include horizontal-list;
  }
}
</style>
