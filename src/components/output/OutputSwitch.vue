<template>
  <Bubble
    v-if="message.type === 'text'"
    :alignment="alignment"
    @on-delete="onDelete"
  >
    <Content :content="message.content" />
  </Bubble>
  <Product
    v-else-if="message.type === 'product'"
    :name="message.name"
    :image="message.image"
  />
  <Bubble v-else>
    <Unknown />
  </Bubble>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import Bubble from '@/components/output/Bubble.vue'
import Content from '@/components/output/Content.vue'
import Product from '@/components/output/Product.vue'
import Unknown from '@/components/output/Unknown.vue'

import { Message, Alignment } from '@/store/message/types'

@Component({
  components: {
    Bubble,
    Content,
    Product,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message
  @Prop() private alignment!: Alignment

  @Emit()
  private onDelete() {
    return 0
  }
}
</script>
