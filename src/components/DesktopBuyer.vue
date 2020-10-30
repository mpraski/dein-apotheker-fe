<template>
  <DesktopSelector :products="products" @on-select="onSelect">
    <template v-slot:selection="props">
      <p @click="props.proceed" class="action">
        {{ $t('cart.add') }}
      </p>
    </template>
    <template v-slot:none="props">
      <p @click="props.proceed" class="action">{{ $t('cart.skip') }}</p>
    </template>
  </DesktopSelector>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Product } from '@/store/chat/types'
import DesktopSelector from '@/components/DesktopSelector.vue'
import Content from '@/components/Content.vue'

@Component({
  components: {
    DesktopSelector,
    Content
  }
})
export default class DesktopBuyer extends Vue {
  @Prop({ default: () => [] })
  private products!: Product[]

  @Emit()
  private onSelect(a: string[]): string[] {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.dektop-buyer {
  @extend .bubble;
}

.action {
  @include actionable;
}
</style>
