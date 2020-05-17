<template>
  <div class="product-body">
    <div class="header">
      <span class="name">{{name}}</span>
      <div>
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
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import CartIcon from 'vue-material-design-icons/Cart.vue'
import InfoIcon from 'vue-material-design-icons/InformationOutline.vue'

@Component({
  components: {
    CartIcon,
    InfoIcon
  }
})
export default class Product extends Vue {
  @Prop({ default: '' }) private name!: string;

  @Emit()
  private onBuy () {
    return 0
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.product-body {
  @extend .vertical-list;

  .header {
    @extend .horizontal-list;
    justify-content: space-between;

    .name {
      font-weight: bold;
    }

    div {
      @extend .horizontal-list;
      align-items: center;

      .info {
        color: $textColorInfo;
      }

      .icon {
        margin-left: $marginSmall;
        height: 1.5rem;
        width: 1.5rem;
        cursor: pointer;
        color: $textColorInfo;
        transition: all $fastAnimationDuration;

        &:hover {
          transform: scale(1.5);
        }

        & > .material-design-icon__svg {
          height: 1.5rem;
          width: 1.5rem;
          bottom: 0;
        }
      }
    }

    margin-bottom: $marginSmall;
  }

  .subheader {
    margin-bottom: $marginMedium;
  }

  .buy {
    @extend .horizontal-list;
    justify-content: space-between;

    border: 1px solid darken($accentColor, 20%);
    border-radius: $borderRadius;
    background-color: $accentColor;

    font-size: $textSize;
    padding: $paddingButtonSmall;
    margin-bottom: $marginSmall;

    @include actionable(darken($accentColor, 10%));

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
