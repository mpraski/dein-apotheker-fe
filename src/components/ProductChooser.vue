<template>
  <div class="product-chooser">
    <ListItem v-bind="input.product" class="product">
      <ChevronRight />
    </ListItem>
    <Options :options="input.answers" @on-select="onSelect" />
  </div>
</template>

<script lang="ts">
import { AnswerValue, ProductInput } from '@/store/chat/types'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ListItem from '@/components/ListItem.vue'
import Options from '@/components/Options.vue'

@Component({
  components: {
    ChevronRight,
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

.product-chooser {
  @extend .bubble;

  .product {
    @include margin-bottom-m;

    border-bottom: 1px solid $borderColor;
  }

  & > div {
    flex-wrap: nowrap;
  }
}
</style>
