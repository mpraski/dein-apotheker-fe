<template>
  <div class="card" :style="cardStyle">
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

  @Prop({ default: () => undefined })
  private bounds?: [number, number]

  private get styleImage(): object {
    return {
      backgroundImage: `url(${this.image})`
    }
  }

  private get cardStyle(): object {
    return this.bounds
      ? {
          width: `${this.bounds[0]}rem`,
          height: `${this.bounds[1]}rem`
        }
      : {}
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.card {
  @include padded-m($horizontal: true, $vertical: false);
  @include vertical-list(center);
  @include respond-to(large) {
    @include horizontal-list(flex-start);
    @include padded-m;
  }

  .image {
    height: 100%;
    width: 100%;

    height: 12rem;
    width: 12rem;

    @include respond-to(large) {
      height: 14rem;
      width: 14rem;
    }

    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
  }

  .actions {
    @include vertical-list;
    @include respond-to(large) {
      @include margin-left-m;
      align-items: flex-start;
    }

    justify-content: center;

    .header {
      margin-bottom: $marginMedium;
      font-size: $textSizeLarge;
      font-weight: bold;

      @include respond-to(large) {
        margin-bottom: $marginRegular;
        font-size: $textSizeHuge;
        font-weight: normal;
      }
    }
  }
}
</style>
