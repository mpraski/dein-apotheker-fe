<template>
  <div class="cart-body">
    <div v-for="[p, c] in items" :key="p.id" class="item">
      <span>{{p.name + ' x ' + c}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { cartNamespace } from '@/store/cart'
import { CartState, Actions as CartActions } from '@/store/cart/types'

@Component({})
export default class Cart extends Vue {
  @State(cartNamespace)
  private items!: CartState;
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.cart-body {
  @extend .vertical-list;
}
</style>
