<template>
  <div>
    <ListItem
      v-bind="input.product"
      large="true"
      height="7"
      width="7"
      class="product"
    />
    <Options :options="input.answers" @on-select="onSelect" />
  </div>
</template>

<script lang="ts">
import { AnswerValue, ProductInput } from '@/store/chat/types'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import ListItem from '@/components/ListItem.vue'
import Options from '@/components/Options.vue'

@Component({
  components: {
    ListItem,
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

.product {
  margin-bottom: $marginMedium;
}
</style>
