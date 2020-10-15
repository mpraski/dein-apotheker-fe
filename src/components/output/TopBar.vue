<template>
  <Bar>
    <template v-slot:left>
      <Logo />
    </template>
    <template v-slot:right>
      <CartButton />
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Bar from '@/components/output/Bar.vue'
import Logo from '@/components/output/Logo.vue'
import CartButton from '@/components/output/CartButton.vue'

@Component({
  components: {
    Bar,
    Logo,
    CartButton
  }
})
export default class TopBar extends Vue {}
</script>
