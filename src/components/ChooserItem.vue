<template>
  <div class="chooser-item">
    <div class="image" :style="styleImage" />
    <p class="header">{{ name }}</p>
    <ChevronRight class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

@Component({
  components: {
    ChevronRight
  }
})
export default class ChooserItem extends Vue {
  @Prop({ default: () => '' })
  private name!: string

  @Prop({ default: () => '' })
  private image!: string

  @Prop({ default: () => 3 })
  private height!: number

  @Prop({ default: () => 3 })
  private width!: number

  private get styleImage(): object {
    return {
      height: `${this.height}rem`,
      width: `${this.width}rem`,
      backgroundImage: `url(${this.image})`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.chooser-item {
  @include horizontal-list(flex-start, nowrap);
  @include actionable;

  align-items: center;

  .image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-origin: content-box;
    margin: $marginSmall;
  }

  .header {
    @include responsive-text;
    margin-left: $marginSmall;
  }

  .icon {
    margin-left: auto;
    margin-right: $marginMedium;
  }
}
</style>
