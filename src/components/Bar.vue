<template>
  <div class="bar-body">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
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
@import "@/assets/app.scss";

.bar-body {
  @include horizontal-list(space-between);

  align-items: center;
  padding: $marginSmall $marginMedium;
  border-bottom: $borderWidth $borderStyle $buttonBorderColor;
}
</style>
