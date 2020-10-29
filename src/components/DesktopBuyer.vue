<template>
  <div class="desktop-buyer">
    <DesktopList :rows="products" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Product } from '@/store/chat/types'
import DesktopList from '@/components/DesktopList.vue'

@Component({
  components: {
    DesktopList
  }
})
export default class DesktopBuyer extends Vue {
  @Prop({ default: () => [] })
  private products!: Product[]
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.dektop-buyer {
  @extend .bubble;
}
</style>
