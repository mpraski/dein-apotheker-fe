<template>
  <div
    class="message-body"
    :class="getAlignment"
    :style="bodyStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot></slot>
    <CloseIcon v-if="myResponse" :class="iconClass" @click="onDelete" class="icon" />
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

  private hover!: boolean;

  constructor () {
    super()
    this.hover = false
  }

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

  private get bodyStyle (): object {
    if (this.myResponse) {
      return {
        paddingRight: '0.5rem'
      }
    }

    return {}
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
  @include horizontal-list(flex-end, nowrap);
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

  min-width: $bubbleWidth;
  margin-bottom: $marginMedium;

  &:first-child {
    margin-top: $marginMedium;
  }

  .icon {
    cursor: pointer;
    margin-left: auto;
    transition: all $fastAnimationDuration;

    &.hidden {
      visibility: hidden;
    }

    &:hover {
      transform: scale(1.5);
    }
  }
}
</style>
