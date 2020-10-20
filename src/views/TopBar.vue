<template>
  <Bar class="top-bar">
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
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.01),
    0 1px 10px 2px rgba(0, 0, 0, 0.025), 0 5px 5px -10px rgba(0, 0, 0, 0.05);

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  @include respond-to(medium) {
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
