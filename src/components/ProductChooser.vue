<template>
  <div class="product-chooser">
    <Card :name="input.product.name" :image="input.product.image">
      <Options :options="input.answers" @on-select="onSelect" flat="true" />
    </Card>
  </div>
</template>

<script lang="ts">
import { AnswerValue, ProductInput } from '@/store/chat/types'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Card from '@/components/Card.vue'
import Bubble from '@/components/Bubble.vue'
import Options from '@/components/Options.vue'

@Component({
  components: {
    Card,
    Bubble,
    Options
  }
})
export default class ProductChooser extends Vue {
  @Prop()
  private input!: ProductInput

  @Emit()
  private onSelect(answer: AnswerValue): AnswerValue {
    return answer
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.product-chooser {
  @extend .bubble;
}
</style>
