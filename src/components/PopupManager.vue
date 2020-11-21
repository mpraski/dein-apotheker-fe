<template>
  <Popup
    v-if="popups.cart"
    :visible="popups.cart"
    title="Your cart"
    @on-close="hidePopup('cart')"
  >
    <Cart />
  </Popup>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import {
  PopupState,
  Actions as PopupActions,
  PopupKey,
  emptyState
} from '@/store/popup/types'
import Popup from '@/components/Popup.vue'
import Cart from '@/components/Cart.vue'

@Component({
  components: {
    Popup,
    Cart
  }
})
export default class PopupManager extends Vue {
  @Prop({ default: () => emptyState() })
  private popups!: PopupState

  @Emit()
  private hidePopup(a: PopupKey): PopupKey {
    return a
  }
}
</script>
