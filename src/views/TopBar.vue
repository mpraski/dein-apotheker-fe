<template>
  <Bar>
    <template v-slot:left><Logo /></template>
    <template v-slot:right>
      <Button @click.native="onRefresh">
        <RefreshIcon title="Start again" />
      </Button>
      <Button><BasketOutline title="Show cart" /></Button>
    </template>
  </Bar>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

import Bar from '@/components/Bar.vue'
import Logo from '@/components/Logo.vue'
import Button from '@/components/Button.vue'
import BasketOutline from 'vue-material-design-icons/BasketOutline.vue'
import RefreshIcon from 'vue-material-design-icons/Refresh.vue'
import Dots from '@/components/Dots.vue'

@Component({
  components: {
    Bar,
    Logo,
    Button,
    BasketOutline,
    RefreshIcon,
    Dots
  }
})
export default class TopBar extends Vue {
  @Emit()
  private onRefresh() {
    return 0
  }
}
</script>
