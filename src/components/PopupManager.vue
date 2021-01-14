<template>
  <FadeIn>
    <Popup
      v-if="popups.cart"
      :title="$t('cart.title')"
      @on-close="hidePopup('cart')"
    >
      <Cart :cart="popups.cart" />
    </Popup>
    <Popup
      v-else-if="popups.chooser"
      :title="$t('product.name')"
      @on-close="hidePopup('chooser')"
    >
      <DesktopChooser :rows="popups.chooser[0]" @on-select="hideChooser" />
    </Popup>
    <Popup
      v-else-if="popups.question"
      :title="popups.question.hint"
      @on-close="hidePopup('question')"
    >
      <Markdown :content="popups.question.content" />
    </Popup>
  </FadeIn>
</template>s

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
import DesktopChooser from '@/components/DesktopChooser.vue'
import FadeIn from '@/components/FadeIn.vue'
import Markdown from '@/components/Markdown.vue'

@Component({
  components: {
    Popup,
    Cart,
    DesktopChooser,
    FadeIn,
    Markdown
  }
})
export default class PopupManager extends Vue {
  @Prop({ default: () => emptyState() })
  private readonly popups!: PopupState

  @Emit()
  private hidePopup(a: PopupKey): PopupKey {
    return a
  }

  @Emit()
  private hideAll(): number {
    return 0
  }

  private created() {
    window.addEventListener('keyup', this.clearPopups)
  }

  private destroyed() {
    window.removeEventListener('keyup', this.clearPopups)
  }

  private clearPopups(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.hideAll()
    }
  }

  private hideChooser(data: any) {
    if (this.popups.chooser) {
      const f = this.popups.chooser[1]
      setTimeout(() => f(data), 200)
    }

    this.hidePopup('chooser')
  }
}
</script>
