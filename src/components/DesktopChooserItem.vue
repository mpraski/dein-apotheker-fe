<template>
  <div class="desktop-chooser-item" :class="itemClass">
    <div class="image" :style="styleImage" />
    <p class="header">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class DesktopChooserItem extends Vue {
  @Prop({ default: () => '' })
  private name!: string

  @Prop({ default: () => '' })
  private image!: string

  @Prop({ default: () => 3 })
  private height!: number

  @Prop({ default: () => 3 })
  private width!: number

  @Prop({ default: () => false })
  private selected!: boolean

  private get styleImage(): object {
    return {
      height: `${this.height}rem`,
      width: `${this.width}rem`,
      backgroundImage: `url(${this.image})`
    }
  }

  private get itemClass(): object {
    return { selected: this.selected }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.desktop-chooser-item {
  @include horizontal-list(flex-start, nowrap);
  @include actionable;

  align-items: center;

  .image {
    @extend .bubble;
    box-shadow: none;
    border: 2px solid $borderColor;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
    margin-left: $marginMedium;
    margin-top: $marginSmall;
    margin-bottom: $marginSmall;
    margin-right: $marginSmall;
    padding: $marginSmall;
  }

  .header {
    @include responsive-text;
  }

  &.selected {
    color: $accentColorDarkest;

    .image {
      border-color: $accentColorDark;
    }
  }
}
</style>
