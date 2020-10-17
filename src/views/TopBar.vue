<template>
  <Bar>
    <template v-slot:left><Logo /></template>
    <template v-slot:right>
      <Button @click.native="onRefresh"><RefreshIcon /></Button>
      <Button><CartIcon /></Button>
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

import Bar from '@/components/Bar.vue'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'
import CartIcon from 'vue-material-design-icons/Cart.vue'
import RefreshIcon from 'vue-material-design-icons/Refresh.vue'

@Component({
  components: {
    Bar,
    Logo,
    Button,
    CartIcon,
    RefreshIcon
  }
})
export default class TopBar extends Vue {
  @Emit()
  private onRefresh() {
    return 0
  }
}
</script>
