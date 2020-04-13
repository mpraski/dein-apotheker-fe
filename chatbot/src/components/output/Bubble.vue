<template>
  <div
    class="message-body"
    v-bind:class="getAlignment"
    :style="bodyStyle"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <slot></slot>
    <FadeIn v-if="myResponse">
      <CloseIcon v-if="hover" @click="onDelete" class="icon" />
    </FadeIn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import FadeIn from '@/components/transition/FadeIn.vue'

import { Alignment } from '@/store/message/types'

@Component({
  components: {
    CloseIcon,
    FadeIn
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
  private onDelete () { return 0 }

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
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.message-body {
  @extend .bubble;
  @include authorable;

  display: flex;
  flex-direction: row;

  min-width: 40%;
  margin-bottom: $marginMedium;

  &:first-child {
    margin-top: $marginMedium;
  }

  @include respond-to(small) {
    margin-bottom: $marginRegular;

    &:first-child {
      margin-top: $marginRegular;
    }
  }

  .icon {
    margin-left: auto;
    border-radius: 2rem;

    cursor: pointer;

    transition: all $fastAnimationDuration;

    &:hover {
      transform: scale(1.5);
    }
  }
}
</style>
