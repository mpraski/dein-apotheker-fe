<template>
  <Bar>
    <template v-slot:left><Logo /></template>
    <template v-slot:right>
      <Button @click.native="onRefresh">
        <RefreshIcon title="Start again" />
      </Button>
      <CartButton @click.native="onCart" :items="cart" />
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'

import Bar from '@/components/Bar.vue'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'
import CartButton from '@/components/CartButton.vue'
import RefreshIcon from 'vue-material-design-icons/Refresh.vue'

@Component({
  components: {
    Bar,
    Logo,
    Button,
    CartButton,
    RefreshIcon
  }
})
export default class TopBar extends Vue {
  @Prop({ default: () => 0 })
  private cart!: number

  @Emit()
  private onRefresh() {
    return 0
  }

  @Emit()
  private onCart() {
    return 0
  }
}
</script>
