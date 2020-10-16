<template>
  <div class="product">
    <div class="image" :style="styleImage" />
    <div class="header">
      <span class="name">{{ name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component({})
export default class Product extends Vue {
  @Prop({ default: '' })
  private name!: string

  @Prop({ default: '' })
  private image!: string

  @Prop({ default: 14 })
  private height!: number

  private get styleImage(): object {
    return {
      height: `${this.height}rem`,
      backgroundImage: `url("${this.image}")`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.product {
  @include vertical-list;

  .image {
    flex-grow: 1;

    border-top-left-radius: $borderRadiusInner;
    border-top-right-radius: $borderRadiusInner;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .header {
    @include padded;
    @include horizontal-list(space-between);

    .name {
      font-weight: bold;
    }

    .info-body {
      @include big-icon;
    }
  }
}
</style>
