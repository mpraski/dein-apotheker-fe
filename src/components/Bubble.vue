<template>
  <div
    class="bubble-wrapper"
    :class="alignmentClass"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="action-wrapper">
      <CloseCircle
        class="action"
        title="Delete this message"
        v-if="isMine"
        :class="showClass"
        @click="onDelete"
      />
      <div class="bubble" :class="alignmentClass">
        <slot></slot>
      </div>
    </div>
    <span class="time" v-if="isMine">{{ time }}</span>
  </div>
</template>

<script lang="ts">
import { Alignment } from '@/store/message/types'
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'

@Component({
  components: {
    CloseCircle
  }
})
export default class Bubble extends Vue {
  @Prop() private alignment!: Alignment
  @Prop() private when!: number

  private hover = false

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

  private get showClass(): object {
    return {
      visible: this.hover
    }
  }

  @Emit()
  private onDelete() {
    return 0
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.bubble-wrapper {
  @extend .alignable;
  @extend .limited-width;
  @include vertical-list(flex-end);

  .action-wrapper {
    @include horizontal-list;
    align-items: center;

    .action {
      @extend .big-icon;
      @extend .transitionable;

      opacity: 0;
      margin-right: $marginSmall;

      &.visible {
        opacity: 1;
      }

      &:hover {
        color: darken($textColorSecondary, 10%);
      }

      &:active {
        color: $textColor;
      }
    }
  }

  .time {
    font-size: $textSizeSmall;
    margin-top: $marginSmallest;
    color: $textColorSecondary;
    user-select: none;
  }
}
</style>
