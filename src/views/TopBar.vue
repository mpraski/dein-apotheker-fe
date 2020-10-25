<template>
  <Bar class="top-bar">
    <template v-slot:left><Logo /></template>
    <template v-slot:right>
      <Button @click.native="onRefresh">
        <RefreshIcon title="Start again" />
      </Button>
      <Button><CartIcon title="Show cart" /></Button>
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
import Dots from '@/components/Dots.vue'

@Component({
  components: {
    Bar,
    Logo,
    Button,
    CartIcon,
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

<style scoped lang="scss">
@import '@/assets/app.scss';

.top-bar {
  z-index: 1;

  background-color: $backgroundColor;
  box-shadow: $boxShadow;

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @include respond-to(medium) {
    background-color: transparent;
    box-shadow: none;
  }
}
</style>
