<template>
  <div class="photo-body" v-bind:class="getAlignment" :style="style">
    <div class="image" :style="styleImage"/>
    <Content :content="content" class="photo-content"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Content from '@/components/output/Content.vue'
import FadeIn from '@/components/transition/FadeIn.vue'

import { Alignment } from '@/store/message/types'

@Component({
  components: {
    Content,
    FadeIn
  }
})
export default class Photo extends Vue {
  @Prop() private alignment!: Alignment;

  @Prop({ default: '' })
  private image!: string;

  @Prop({ default: '' })
  private content!: string;

  @Prop({ default: 18 })
  private height!: number;

  private get getAlignment () {
    return {
      [this.alignment.toLowerCase()]: true
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
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.photo-body {
  @extend .bubble;
  @include authorable;

  display: flex;
  flex-direction: column;

  max-width: 100%;
  margin-bottom: $marginMedium;
  padding: 0;

  @include respond-to(small) {
    margin-bottom: $marginRegular;
    max-width: 70%;
  }

  .image {
    flex-grow: 1;

    border-top-left-radius: 0.65rem;
    border-top-right-radius: 0.65rem;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .photo-content {
    padding: $paddingButtonSmall;

    @include respond-to(small) {
        padding: $paddingButton;
    }
  }
}
</style>
