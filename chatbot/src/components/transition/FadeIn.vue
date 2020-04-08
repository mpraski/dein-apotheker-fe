<template>
  <transition-group v-if="group" name="fade" tag="div">
    <slot></slot>
  </transition-group>
  <transition v-else name="fade" tag="div">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class FadeIn extends Vue {
  @Prop({ default: false })
  private group!: boolean;
}
</script>

<style lang="scss">
@import "@/assets/app.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
