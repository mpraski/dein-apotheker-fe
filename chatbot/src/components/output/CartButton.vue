<template>
  <div class="cart-button">
    <div class="badge" v-if="badgeVisible">{{items}}</div>
    <CartIcon class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import CartIcon from 'vue-material-design-icons/Cart.vue'

@Component({
  components: {
    CartIcon
  }
})
export default class CartButton extends Vue {
  @Prop({ default: 0 }) private items!: number;

  private get badgeVisible (): boolean {
    return this.items !== 0
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.cart-button {
  width: 3rem;
  height: 3rem;
  border-radius: $borderRadius;
  position: relative;

  @include actionable;

  .icon {
    @include big-icon;

    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 1;
  }

  .badge {
    position: absolute;
    background-color: red;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1.25rem;
    text-align: center;
    color: white;
    font-weight: bold;
    z-index: 2;
  }
}
</style>
