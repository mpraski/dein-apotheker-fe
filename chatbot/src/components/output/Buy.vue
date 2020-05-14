<template>
  <div class="buy-body">
    <span class="header">{{name}}</span>
    <span class="subheader">{{price}}</span>
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

@Component({
  components: {
    CartIcon
  }
})
export default class Buy extends Vue {
  @Prop({ default: "" }) private name!: string;
  @Prop({ default: "" }) private price!: string;

  @Emit()
  private onBuy() {
    return 0;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.buy-body {
  @extend .vertical-list;

  .header {
    font-weight: bold;
  }

  .subheader {
    margin-bottom: $marginMedium;
  }

  .buy {
    display: flex;
    justify-content: space-between;
    flex: 0 0 100%;

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
