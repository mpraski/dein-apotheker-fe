<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class FadeIn extends Vue {}
</script>

<style lang="scss">
@import '@/assets/app.scss';

.fade-enter-active,
.fade-leave-active {
  @extend .transitionable;
  transform: none;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate(0, 16px);
}
</style>
