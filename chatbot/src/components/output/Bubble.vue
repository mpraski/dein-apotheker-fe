<template>
  <div
    class="message-body"
    :class="getAlignment"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot></slot>
    <div v-if="myResponse" class="close">
      <CloseIcon :class="iconClass" @click="onDelete" class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { Alignment } from '@/store/message/types'

@Component({
  components: {
    CloseIcon
  }
})
export default class Bubble extends Vue {
  @Prop() private alignment!: Alignment;

  private hover = false;

  @Emit()
  private onDelete () {
    return 0
  }

  private get getAlignment () {
    return {
      [this.alignment.toLowerCase()]: true
    }
  }

  private get myResponse (): boolean {
    return this.alignment === 'RIGHT'
  }

  private get iconClass (): object {
    return {
      hidden: !this.hover
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.message-body {
  @include horizontal-list(flex-start);
  @include bubble(
    $bubbleAccentColor,
    $bubbleAccentColor,
    $bubbleBackgroundColor,
    $bubbleBackgroundColor
  );
  @include authorable(
    $bubbleAccentColor,
    $bubbleAccentColor,
    $bubbleBackgroundColor,
    $bubbleBackgroundColor
  );

  @include respond-to(small) {
    padding: $paddingButton;
    max-width: $bubbleMaxWidth;
  }

  position: relative;
  margin-bottom: $marginMedium;
  max-width: $bubbleMaxWidthSmall;
  min-width: $bubbleMinWidth;

  &:first-child {
    margin-top: $marginMedium;
  }

  .close {
    @include horizontal-list(center);

    position: absolute;
    top: 0;
    bottom: 0;
    width: 2.5rem;
    height: 2.5rem;
    left: -2.5rem;
    height: 100%;

    .icon {
      cursor: pointer;

      &.hidden {
        visibility: hidden;
      }

      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
</style>
