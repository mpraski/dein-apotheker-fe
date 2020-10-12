<template>
  <Bar>
    <template v-slot:left>
      <Logo />
    </template>
    <template v-slot:right>
      <CartButton @click.native="showPopup(['cart', {}])" :items="itemCount" />
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { popupNamespace } from '@/store/popup'
import { cartNamespace } from '@/store/cart'

import { Actions as PopupActions, PopupKey } from '@/store/popup/types'
import { Getters as CartGetters } from '@/store/cart/types'

import Bar from '@/components/output/Bar.vue'
import CartButton from '@/components/output/CartButton.vue'
import Logo from '@/components/output/Logo.vue'

@Component({
  components: {
    Bar,
    CartButton,
    Logo
  }
})
export default class TopBar extends Vue {
  @Action(PopupActions.showPopup, { namespace: popupNamespace })
  private showPopup!: (a: [PopupKey, any]) => void;

  @Getter(CartGetters.itemCount, { namespace: cartNamespace })
  private itemCount!: number;
}
</script>
