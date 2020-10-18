<template>
  <div class="bubble-wrapper" :class="alignmentClass">
    <div class="bubble" :class="alignmentClass">
      <slot></slot>
    </div>
    <span class="time" v-if="isMine">{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { Alignment } from '@/store/message/types'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Bubble extends Vue {
  @Prop() private alignment!: Alignment
  @Prop() private when!: number

  private get time(): string {
    return new Date(this.when).toLocaleTimeString()
  }

  private get alignmentClass(): object {
    return {
      [this.alignment.toLowerCase()]: true
    }
  }

  private get isMine(): boolean {
    return this.alignment === 'RIGHT'
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.bubble-wrapper {
  @extend .alignable;
  @extend .limited-width;
  @include vertical-list(flex-end);

  .time {
    font-size: $textSizeSmall;
    margin-top: $marginSmallest;
    color: $textColorSecondary;
  }
}
</style>
