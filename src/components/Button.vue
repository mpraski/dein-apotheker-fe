<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Button extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.button {
  @include bordered;
  @include actionable;

  width: $buttonSize;
  height: $buttonSize;
  position: relative;
  background-color: transparent;
  border: 0;

  > * {
    @include big-icon;

    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1;
  }
}
</style>
