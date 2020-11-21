<template>
  <div class="cart">
    <DesktopChooserItem v-for="item in cart" :key="item.id" v-bind="item" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import DesktopChooserItem from '@/components/DesktopChooserItem.vue'

@Component({
  components: {
    DesktopChooserItem
  }
})
export default class Cart extends Vue {
  @Prop({ default: () => [] })
  private cart!: Cart
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';
</style>
