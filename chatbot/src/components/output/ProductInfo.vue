<template>
  <div class="product-info-body">
    <div v-for="i in items" :key="i.title" class="item">
      <h3 class="header">{{i.title}}</h3>
      <VueMarkdown v-once :source="i.content" class="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import VueMarkdown from 'vue-markdown'

interface Item {
  title: string;
  content: string;
}

@Component({
  components: {
    VueMarkdown
  }
})
export default class ProductInfo extends Vue {
  @Prop({ default: '' }) private directions!: string;
  @Prop({ default: '' }) private explanation!: string;

  private get items (): ReadonlyArray<Item> {
    return [
      {
        title: 'Directions',
        content: this.directions
      },
      {
        title: 'Explanation',
        content: this.explanation
      }
    ]
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.product-info-body {
  @extend .vertical-list;

  .item {
    @extend .vertical-list;

    &:not(:last-child) {
      margin-bottom: $marginMedium;
      padding-bottom: $marginMedium;
      border-bottom: $borderWidth $borderStyle $secondaryBackgroundColor;
    }

    .header {
      font-size: $textSize;
      margin-top: 0;
      margin-bottom: $marginSmall;
      color: $textColorInfo;
    }
  }
}
</style>
