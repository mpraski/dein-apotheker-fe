<template>
  <transition-group v-if="group" mode="out-in" :name="name" tag="div">
    <slot></slot>
  </transition-group>
  <transition v-else mode="out-in" :name="name" tag="div">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class FadeIn extends Vue {
  @Prop({ default: false })
  private group!: boolean;

  @Prop({ default: false })
  private delay!: boolean;

  private get name (): string {
    return this.delay ? 'fade-delay' : 'fade'
  }
}
</script>

<style lang="scss">
@import "@/assets/app.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity $animationDuration;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-delay-enter-active,
.fade-delay-leave-active {
  transition: opacity $animationDuration;
  transition-delay: $animationDelay;
}

.fade-delay-enter,
.fade-delay-leave-to {
  opacity: 0;
}
</style>
