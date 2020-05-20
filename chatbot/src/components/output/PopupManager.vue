<template>
  <Popup
    v-if="popups.product"
    :visible="popups.product"
    :title="popups.product.name"
    @on-close="hidePopup('product')"
  >
    <ProductInfo :directions="popups.product.directions" :explanation="popups.product.explanation" />
  </Popup>
  <Popup
    v-else-if="popups.cart"
    :visible="popups.cart"
    title="Your items"
    @on-close="hidePopup('cart')"
  ></Popup>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import { popupNamespace } from '@/store/popup'

import {
  PopupState,
  Actions as PopupActions,
  PopupKey
} from '@/store/popup/types'

import ProductInfo from '@/components/output/ProductInfo.vue'
import Popup from '@/components/output/Popup.vue'

@Component({
  components: {
    ProductInfo,
    Popup
  }
})
export default class PopupManager extends Vue {
  @State(popupNamespace)
  popups!: PopupState;

  @Action(PopupActions.hidePopup, { namespace: popupNamespace })
  hidePopup!: (a: PopupKey) => void;
}
</script>
