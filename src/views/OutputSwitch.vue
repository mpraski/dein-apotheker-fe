<template>
  <Bubble :alignment="data.alignment" :when="data.when" @on-delete="onDelete">
    <Content v-if="message.type === 'text'" :content="message.content" />
    <Card
      v-else-if="message.type === 'product'"
      :name="message.name"
      :image="message.image"
    />
    <Unknown v-else />
  </Bubble>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import Card from '@/components/Card.vue'
import Bubble from '@/components/Bubble.vue'
import Content from '@/components/Content.vue'
import Unknown from '@/components/Unknown.vue'

import { Message, MessageData } from '@/store/message/types'

@Component({
  components: {
    Card,
    Bubble,
    Content,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message
  @Prop() private data!: MessageData

  @Emit()
  private onDelete() {
    return 0
  }
}
</script>
