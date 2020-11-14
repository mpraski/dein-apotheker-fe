<template>
  <div class="card">
    <div class="image" :style="styleImage" />
    <div class="actions">
      <p class="header">{{ name }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Card extends Vue {
  @Prop({ default: () => '' })
  private name!: string

  @Prop({ default: () => '' })
  private image!: string

  @Prop({ default: () => 14 })
  private height!: number

  @Prop({ default: () => 14 })
  private width!: number

  private get styleImage(): object {
    return {
      backgroundImage: `url(${this.image})`,
      height: `${this.height}rem`,
      width: `${this.width}rem`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.card {
  @extend .padded;
  @include horizontal-list(flex-start);

  .image {
    height: 100%;
    width: 100%;

    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
  }

  .actions {
    @include vertical-list;
    @extend .margin-left;
    justify-content: center;

    .header {
      font-size: $textSizeBig;
      margin-bottom: $marginRegular;
    }
  }
}
</style>
