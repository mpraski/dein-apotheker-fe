<template>
  <Placeholder v-if="isEnd" :text="$t('message.thankYou')" />
  <Options
    v-else-if="isOptionsInput"
    :options="options"
    @on-select="onAnswer"
  />
  <Chooser
    v-else-if="isList"
    :rows="input.rows"
    :columns="listColumns"
    @on-select="onAnswer"
  />
  <Chooser v-else-if="isProductList" :rows="input.rows" @on-select="onAnswer">
    <template v-slot:selection>
      <Item :content="$t('cart.add')" @click.native="selection.proceed" />
    </template>
    <template v-slot:none>
      <Item :content="$t('cart.skip')" @click.native="none.proceed" />
    </template>
  </Chooser>
  <Prompt v-else-if="isFree" @on-submit="onAnswer" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Placeholder from '@/components/Placeholder.vue'
import Options from '@/components/Options.vue'
import Prompt from '@/components/Prompt.vue'
import Chooser from '@/components/Chooser.vue'

import {
  Input,
  QuestionType,
  AnswerValue,
  Database,
  QuestionOption,
  Product as APIProduct
} from '@/store/chat/types'
import { VueConstructor } from 'vue'

@Component({
  components: {
    Options,
    Prompt,
    Placeholder,
    Chooser
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

  private get isProductList(): boolean {
    return this.type === 'product_list'
  }

  private get isFree(): boolean {
    return this.type === 'free'
  }

  private get isOptionsInput(): boolean {
    switch (this.type) {
      case 'question':
      case 'product':
      case 'comment':
        return true
    }

    return false
  }

  private get options(): Array<QuestionOption> {
    switch (this.type) {
      case 'question':
      case 'product':
      case 'comment':
        return this.input as Array<QuestionOption>
    }

    return []
  }

  private get listColumns(): number {
    if (
      this.type === 'list' &&
      (this.input as Database).database === 'Brands'
    ) {
      return 3
    }

    return 2
  }

  /*private get listComponent(): VueConstructor<Vue> | undefined {
    switch (this.type) {
      case 'list':
      case 'product_list':
        return Card
    }

    return undefined
  }*/

  @Emit()
  private onAnswer(answer: AnswerValue): AnswerValue {
    return answer
  }
}
</script>
