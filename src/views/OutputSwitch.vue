<template>
  <Bubble :class="getAlignment(alignment)">
    <Content v-if="message.type === 'text'" :content="message.content" />
    <Product
      v-else-if="message.type === 'product'"
      :name="message.name"
      :image="message.image"
      :height="10"
    />
    <Unknown v-else />
  </Bubble>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Bubble from '@/components/Bubble.vue'
import Content from '@/components/Content.vue'
import Product from '@/components/Product.vue'
import Unknown from '@/components/Unknown.vue'

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

  private getAlignment(alignment: string) {
    return {
      [alignment.toLowerCase()]: true
    }
  }
}
</script>
