<template>
  <div class="bubble">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Alignment } from '@/store/message/types'

@Component({})
export default class Bubble extends Vue {
  @Prop() private alignment!: Alignment
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.bubble {
  @include bubble($buttonBorderColor, white);
}
</style>
