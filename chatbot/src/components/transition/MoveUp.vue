<template>
  <transition-group v-if="group" name="move-up" tag="div">
    <slot></slot>
  </transition-group>
  <transition v-else name="move-up" tag="div">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class MoveUp extends Vue {
  @Prop({ default: false })
  private group!: boolean;
}
</script>

<style lang="scss">
@import "@/assets/app.scss";

.move-up-item {
  transition: all 0.5s ease-out;
  transition-delay: 0.25s;
  display: inline-block;
}

.move-up-enter,
.move-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.move-up-leave-active {
  position: absolute;
}
</style>
