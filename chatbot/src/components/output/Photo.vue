<template>
  <div class="photo-body" v-bind:class="getAlignment" :style="style">
    <div class="image" :style="styleImage" />
    <div v-bind:class="styleContent">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import FadeIn from '@/components/transition/FadeIn.vue'

import { Alignment } from '@/store/message/types'

@Component({
  components: {
    FadeIn
  }
})
export default class Photo extends Vue {
  @Prop() private alignment!: Alignment;

  @Prop({ default: '' })
  private image!: string;

  @Prop({ default: false })
  private full!: boolean;

  @Prop({ default: false })
  private padded!: boolean;

  @Prop({ default: 18 })
  private height!: number;

  private get getAlignment () {
    return {
      [this.alignment.toLowerCase()]: true,
      full: this.full
    }
  }

  private get style (): object {
    return {
      height: `${this.height}rem`
    }
  }

  private get styleImage (): object {
    return {
      backgroundImage: `url("${this.image}")`
    }
  }

  private get styleContent (): object {
    return {
      padded: this.padded
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.photo-body {
  @include bubble(lighten($accentColor, 10%), lighten($accentColor, 10%), $bubbleBackgroundColor, $bubbleBackgroundColor);
  @include authorable(lighten($accentColor, 10%), lighten($accentColor, 10%), $bubbleBackgroundColor, $bubbleBackgroundColor);

  display: flex;
  flex-direction: column;

  max-width: 100%;
  margin-bottom: $marginMedium;
  padding: 0 !important;

  @include respond-to(small) {
    margin-bottom: $marginRegular;
    max-width: 70%;
  }

  &.full {
    width: 100%;
  }

  .image {
    flex-grow: 1;

    border-top-left-radius: 0.65rem;
    border-top-right-radius: 0.65rem;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .padded {
    padding: $paddingButtonSmall;

    @include respond-to(small) {
      padding: $paddingButton;
    }
  }
}
</style>
