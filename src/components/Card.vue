<template>
  <div class="card" :style="styleImage">
    <img class="image" :src="image" />
    <div class="header">
      <span class="name">{{ name }}</span>
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

  private get styleImage(): object {
    return {
      height: `${this.height}rem`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.card {
  @include vertical-list;

  .image {
    width: 100%;
    height: auto;

    border-top-left-radius: $borderRadiusInner;
    border-top-right-radius: $borderRadiusInner;
  }

  .header {
    @extend .padded;
    @include horizontal-list(space-between);

    .name {
      font-weight: bold;
    }

    .info-body {
      @extend .big-icon;
    }
  }
}
</style>
