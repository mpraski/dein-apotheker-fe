<template>
  <div class="product-body">
    <div class="image" :style="styleImage" />
    <div class="header">
      <span class="name">{{name}}</span>
      <div class="info-body" @click="onInfo">
        <span class="info">More</span>
        <InfoIcon class="icon" />
      </div>
    </div>
    <div class="buy" @click="onBuy">
      <CartIcon class="icon" />
      <span>Add to Basket</span>
      <CartIcon class="invisible" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

import CartIcon from "vue-material-design-icons/Cart.vue";
import InfoIcon from "vue-material-design-icons/InformationOutline.vue";

@Component({
  components: {
    CartIcon,
    InfoIcon
  }
})
export default class Product extends Vue {
  @Prop({ default: "" }) private name!: string;

  @Prop({ default: "" })
  private image!: string;

  @Prop({ default: 14 })
  private height!: number;

  @Emit()
  private onBuy() {
    return 0;
  }

  @Emit()
  private onInfo() {
    return 0;
  }

  private get styleImage(): object {
    return {
      height: `${this.height}rem`,
      backgroundImage: `url("${this.image}")`
    };
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.product-body {
  @extend .vertical-list;
  @include bubble($buttonBorderColor, $backgroundColor);

  padding: 0 !important;
  margin-bottom: $marginMedium;

  .image {
    flex-grow: 1;

    border-top-left-radius: $borderRadiusInner;
    border-top-right-radius: $borderRadiusInner;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .header {
    @include horizontal-list(space-between);

    padding: $paddingButtonSmall;

    .name {
      font-weight: bold;
    }

    .info-body {
      @include horizontal-list;

      cursor: pointer;
      align-items: center;

      .info {
        color: $textColorInfo;
      }

      .icon {
        @include big-icon;
        margin-left: $marginMinute;
      }
    }
  }

  .buy {
    @include actionable;
    @include horizontal-list(space-between);
    @include actionable(darken($focusColor, 10%));

    border: 1px solid darken($focusColor, 20%);
    border-radius: $borderRadius;
    background-color: $focusColor;
    font-size: $textSize;
    padding: $paddingButtonSmall;
    margin: $marginSmall;

    @include respond-to(small) {
      font-size: $textSizeLarge;
      padding: $paddingButtonBuy;
    }

    span {
      align-self: center;
    }

    .icon {
      align-self: flex-start;
    }

    .invisible {
      visibility: hidden;
    }
  }
}
</style>
