<template>
  <transition-group v-if="group" name="fade-delay" tag="div">
    <slot></slot>
  </transition-group>
  <transition v-else name="fade-delay" tag="div">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class FadeInDelay extends Vue {
  @Prop({ default: false })
  private group!: boolean;
}
</script>

<style lang="scss">
@import "@/assets/app.scss";

.fade-delay-enter-active,
.fade-delay-leave-active {
  transition: opacity 0.25s;
  transition-delay: 0.25s;
}

.fade-delay-enter,
.fade-delay-leave-to {
  opacity: 0;
}
</style>
