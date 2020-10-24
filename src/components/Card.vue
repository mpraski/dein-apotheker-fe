<template>
  <div class="card" :style="styleCard">
    <div class="image" :style="styleImage" />
    <p class="header">{{ name }}</p>
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

  private get styleCard(): object {
    return {
      height: `${this.height}rem`,
      width: `${this.width}rem`
    }
  }

  private get styleImage(): object {
    return {
      backgroundImage: `url(${this.image})`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.card {
  @include vertical-list;

  .image {
    height: 100%;
    width: 100%;

    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;

    padding-top: $marginSmall;

    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;
  }

  .header {
    @extend .padded;
  }
}
</style>
