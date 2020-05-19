<template>
  <Bar>
    <template v-slot:left>Dein Apotheker</template>
    <template v-slot:right>
      <CartButton @click.native="cartVisible = true" items="3"/>
      <Popup :visible="cartVisible" title="Your items" @on-close="cartVisible = false">items</Popup>
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Bar from '@/components/output/Bar.vue'
import CartButton from '@/components/output/CartButton.vue'
import Popup from '@/components/output/Popup.vue'

@Component({
  components: {
    Bar,
    CartButton,
    Popup
  }
})
export default class TopBar extends Vue {
  private cartVisible = false;
}
</script>

<style scoped lang="scss">
</style>
