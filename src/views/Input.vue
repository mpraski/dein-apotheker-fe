<template>
  <Placeholder v-if="isEnd" :text="$t('message.thankYou')" />
  <Options
    v-else-if="isOptionsInput"
    :options="options"
    @on-select="onAnswer"
  />
  <ProductChooser v-else-if="isProduct" :input="input" @on-select="onAnswer" />
  <Option
    v-else-if="isList"
    :content="$t('product.openList')"
    @click.native="onChooser"
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
import Option from '@/components/Option.vue'
import Options from '@/components/Options.vue'
import Prompt from '@/components/Prompt.vue'
import DesktopBuyer from '@/components/DesktopBuyer.vue'
import ProductChooser from '@/components/ProductChooser.vue'

import {
  Input as InputT,
  QuestionType,
  AnswerValue,
  Database,
  QuestionOption,
  Product as APIProduct,
  ProductInput,
  Row
} from '@/store/chat/types'
import { VueConstructor } from 'vue'

@Component({
  components: {
    Option,
    Options,
    Prompt,
    Placeholder,
    DesktopBuyer,
    ProductChooser
  }
})
export default class Input extends Vue {
  @Prop() private type!: QuestionType
  @Prop() private input!: InputT

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

  @Emit()
  private onAnswer(answer: AnswerValue): AnswerValue {
    return answer
  }

  @Emit()
  private onChooser(): [Row[], (a: AnswerValue) => void] {
    return [(this.input as Database).rows, this.onAnswer.bind(this)]
  }
}
</script>
