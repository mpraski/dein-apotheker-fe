<template>
  <div class="list-item" :class="itemClass">
    <div class="image" :style="styleImage" />
    <p class="header">{{ name }}</p>
    <div class="icon"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ListItem extends Vue {
  @Prop({ default: () => '' })
  private readonly name!: string

  @Prop({ default: () => '' })
  private readonly image!: string

  @Prop({ default: () => 4 })
  private readonly height!: number

  @Prop({ default: () => 4 })
  private readonly width!: number

  @Prop({ default: () => false })
  private readonly selected!: boolean

  @Prop({ default: () => false })
  private readonly large!: boolean

  private get styleImage(): object {
    return {
      height: `${this.height}rem`,
      width: `${this.width}rem`,
      backgroundImage: `url(${this.image})`
    }
  }

  private get itemClass(): object {
    return { large: this.large, selected: this.selected }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.list-item {
  @include horizontal-list(flex-start, nowrap);

  align-items: center;

  padding: $marginBetween $marginMedium;

  &:not(.large) {
    @include actionable;
  }

  &.large {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
  }

  .header {
    @include responsive-text;
    margin-left: $marginMedium;
  }

  .icon {
    margin-left: auto;
  }

  &.selected {
    color: $accentColorDarkest;
  }
}
</style>
