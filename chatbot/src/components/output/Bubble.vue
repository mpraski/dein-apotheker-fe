<template>
  <div
    class="message-body"
    v-bind:class="getAlignment"
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
  @include bubble(
    lighten($accentColor, 10%),
    lighten($accentColor, 10%),
    $bubbleBackgroundColor,
    $bubbleBackgroundColor
  );
  @include authorable(
    lighten($accentColor, 10%),
    lighten($accentColor, 10%),
    $bubbleBackgroundColor,
    $bubbleBackgroundColor
  );

  display: flex !important;
  flex-direction: row !important;

  min-width: 25%;
  margin-bottom: $marginMedium;

  &:first-child {
    margin-top: $marginMedium;
  }

  .icon {
    cursor: pointer;
    margin-left: auto !important;
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
