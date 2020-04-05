<template>
  <VueMarkdown v-once :source="content" class="message-body" v-bind:class="getAlignment"></VueMarkdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Message extends Vue {
  @Prop() private content!: string;
  @Prop() private alignment!: 'left' | 'right';

  get getAlignment () {
    return {
      [this.alignment]: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.message-body {
  @extend .bubble;

  margin-bottom: 1.5rem;
  min-width: 50%;
  position: relative;

  &:hover {
    &:after {
      border-top: 10px solid #eeeeee;
    }
  }

  &:active {
    &:before {
      border-top: 10px solid darken(#eeeeee, 10%);
    }
    &:after {
      border-top: 10px solid darken(#eeeeee, 10%);
    }
  }

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #eeeeee;
    border-bottom: 10px solid transparent;
    bottom: -21px;
  }

  &:after {
    transition: 0.1s;
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
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
