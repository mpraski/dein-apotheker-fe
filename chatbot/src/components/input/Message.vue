<template>
  <VueMarkdown v-once :source="content" class="message-body" v-bind:class="getAlignment"></VueMarkdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

import { Alignment } from '@/domain/command'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Message extends Vue {
  @Prop() private content!: string;
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

  position: relative;
  min-width: 50%;

  margin-bottom: $marginMedium;

  @include respond-to(small) {
    margin-bottom: $marginRegular;
  }

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid $buttonBorderColor;
    border-bottom: 10px solid transparent;
    bottom: -21px;
  }

  &:after {
    transition: $animationDuration;
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid $backgroundColor;
    border-bottom: 10px solid transparent;
    bottom: -18px;
  }

  &.right {
    align-self: flex-end;
    &:before {
      right: 1.5em;
    }

    &:after {
      right: 1.5em;
    }
  }

  &.left {
    align-self: flex-start;
    &:before {
      left: 1.5em;
    }

    &:after {
      left: 1.5em;
    }
  }
}
</style>
