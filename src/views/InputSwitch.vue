<template>
  <Placeholder v-if="isEnd" :text="$t('message.thankYou')" />
  <Options
    v-else-if="isOptionsInput"
    :options="options"
    @on-select="onAnswer"
  />
  <ProductChooser v-else-if="isProduct" :input="input" @on-select="onAnswer" />
  <DesktopChooser
    v-else-if="isList"
    :rows="input.rows"
    :columns="listColumns"
    @on-select="onAnswer"
  />
  <DesktopBuyer
    v-else-if="isProductList"
    :products="input.rows"
    @on-select="onAnswer"
  />
  <Prompt v-else-if="isFree" @on-submit="onAnswer" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Placeholder from '@/components/Placeholder.vue'
import Options from '@/components/Options.vue'
import Prompt from '@/components/Prompt.vue'
import DesktopChooser from '@/components/DesktopChooser.vue'
import DesktopBuyer from '@/components/DesktopBuyer.vue'
import ProductChooser from '@/components/ProductChooser.vue'

import {
  Input,
  QuestionType,
  AnswerValue,
  Database,
  QuestionOption,
  Product as APIProduct,
  ProductInput
} from '@/store/chat/types'
import { VueConstructor } from 'vue'

@Component({
  components: {
    Options,
    Prompt,
    Placeholder,
    DesktopChooser,
    DesktopBuyer,
    ProductChooser
  }
})
export default class InputSwitch extends Vue {
  @Prop() private type!: QuestionType
  @Prop() private input!: Input

  private get isEnd(): boolean {
    return (
      this.type === 'question' && !(this.input as Array<QuestionOption>).length
    )
  }

  private get isList(): boolean {
    return this.type === 'list'
  }

  private get isProduct(): boolean {
    return this.type === 'product'
  }

  private get isProductList(): boolean {
    return this.type === 'product_list'
  }

  private get isFree(): boolean {
    return this.type === 'free'
  }

  private get isOptionsInput(): boolean {
    switch (this.type) {
      case 'question':
      case 'comment':
        return true
    }

    return false
  }

  private get options(): Array<QuestionOption> {
    switch (this.type) {
      case 'question':
      case 'comment':
        return this.input as Array<QuestionOption>
      case 'product':
        return (this.input as ProductInput).answers
    }

    return []
  }

  private get listColumns(): number {
    return 2
  }

  @Emit()
  private onAnswer(answer: AnswerValue): AnswerValue {
    return answer
  }
}
</script>
