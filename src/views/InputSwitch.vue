<template>
  <Options v-if="isOptionsInput" :options="options" @on-select="onAnswer" />
  <List
    v-else-if="type === 'list'"
    :component="listComponent"
    :rows="input"
    @on-select="onAnswer"
  />
  <List
    v-else-if="type === 'product_list'"
    :component="listComponent"
    :rows="input"
    @on-select="onAnswer"
  >
    <template v-slot:selection>
      <Item :content="$t('cart.add')" @click.native="selection.proceed" />
    </template>
    <template v-slot:none>
      <Item :content="$t('cart.skip')" @click.native="none.proceed" />
    </template>
  </List>
  <Prompt v-else-if="type === 'free'" @on-submit="onAnswer" />
  <Placeholder v-else-if="type === 'end'" :text="$t('message.thankYou')" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Options from '@/components/Options.vue'
import Prompt from '@/components/Prompt.vue'
import List from '@/components/List.vue'
import Placeholder from '@/components/Placeholder.vue'
import Product from '@/components/Product.vue'
import Brand from '@/components/Brand.vue'
import API from '@/components/API.vue'

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
    Product,
    Brand,
    API
  }
})
export default class InputSwitch extends Vue {
  @Prop() private type!: QuestionType
  @Prop() private input!: Input

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
      case 'comment':
        return this.input as Array<QuestionOption>
      case 'product':
        return this.productOptions(this.input as APIProduct)
    }

    return []
  }

  private get listComponent(): VueConstructor<Vue> | undefined {
    if (this.type === 'product_list') {
      return Product
    }

    if (this.type === 'list') {
      const db = this.input as Database
      switch (db.database) {
        case 'Products':
          return Product
        case 'Brands':
          return Brand
        case 'API':
          return API
      }
    }

    return undefined
  }

  private productOptions(product: APIProduct): Array<QuestionOption> {
    return [
      {
        id: product.id,
        text: this.$t('cart.add').toString()
      },
      {
        id: 'skip',
        text: this.$t('cart.skip').toString()
      }
    ]
  }

  @Emit()
  private onAnswer(v: AnswerValue): AnswerValue {
    return v
  }
}
</script>
