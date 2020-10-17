<template>
  <p class="item" :class="{ selected: this.selected }">{{ content }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Item extends Vue {
  @Prop({ default: '' })
  private content!: string

  @Prop({ default: false })
  private selected!: boolean
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.item {
  @include bubble($buttonBorderColor, $buttonBorderColor);
  @include actionable(darken($buttonBorderColor, 10%));
  @include padded;

  border-radius: 10rem !important;
}
</style>
