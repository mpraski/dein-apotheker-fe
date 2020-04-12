<template>
  <div class="message-body" v-bind:class="getAlignment">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { Alignment } from '@/store/message/types'

@Component({})
export default class Bubble extends Vue {
  @Prop() private alignment!: Alignment;

  get getAlignment () {
    return {
      [this.alignment.toLowerCase()]: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.message-body {
  @extend .bubble;
  @include authorable;

  min-width: 50%;
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
}
</style>
