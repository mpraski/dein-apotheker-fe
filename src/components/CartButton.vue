<template>
  <div class="cart-button">
    <div class="badge" v-if="badgeVisible">{{ items }}</div>
    <Button>
      <BasketOutline title="Show cart" class="icon" />
    </Button>
    <FadeIn>
      <span v-if="showPopover" class="popover">{{ $t('cart.added') }}</span>
    </FadeIn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import Button from '@/components/Button.vue'
import BasketOutline from 'vue-material-design-icons/BasketOutline.vue'
import FadeIn from '@/components/FadeIn.vue'

@Component({
  components: {
    Button,
    BasketOutline,
    FadeIn
  }
})
export default class CartButton extends Vue {
  @Prop({ default: () => 0 })
  private readonly items!: number

  private timerID = -1
  private showPopover = false

  private static readonly defaultInterval: number = 1000

  private get badgeVisible(): boolean {
    return this.items !== 0
  }

  private hidePopover() {
    this.showPopover = false
    this.timerID = -1
  }

  @Watch('items')
  private onPropertyChanged(value: number, old: number) {
    if (value <= old) {
      return
    }

    if (this.timerID !== -1) {
      clearTimeout(this.timerID)
    }

    this.showPopover = true

    this.timerID = setTimeout(
      this.hidePopover.bind(this),
      CartButton.defaultInterval
    )
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.cart-button {
  @include actionable;

  width: $buttonSize;
  height: $buttonSize;
  border-radius: $borderRadius;
  position: relative;

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

  .popover {
    position: absolute;
    white-space: nowrap;
    left: calc(-100% - 3rem - 2rem);
    top: 50%;
    transform: translateY(-50%);

    background-color: $textColorSecondary;
    color: white;

    border-radius: $borderRadius / 2;
    padding: 0.25rem 0.5rem;

    z-index: 1;
  }
}
</style>
