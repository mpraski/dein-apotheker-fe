<template>
  <Bar>
    <template v-slot:left>Dein Apotheker</template>
    <template v-slot:right>
      <CartButton @click.native="showPopup(['cart', {}])" items="3" />
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { popupNamespace } from '@/store/popup'

import { Actions as PopupActions, PopupKey } from '@/store/popup/types'

import Bar from '@/components/output/Bar.vue'
import CartButton from '@/components/output/CartButton.vue'

@Component({
  components: {
    Bar,
    CartButton
  }
})
export default class TopBar extends Vue {
  @Action(PopupActions.showPopup, { namespace: popupNamespace })
  showPopup!: (a: [PopupKey, any]) => void;
}
</script>
