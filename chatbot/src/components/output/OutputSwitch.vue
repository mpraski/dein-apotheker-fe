<template>
  <Bubble v-if="message.type === 'MESSAGE_TEXT'" :alignment="message.alignment">
    <Content :content="message.content" />
  </Bubble>
  <Unknown v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Bubble from '@/components/output/Bubble.vue'
import Content from '@/components/output/Content.vue'
import Unknown from '@/components/output/Unknown.vue'

import { Message } from '@/domain/message'

@Component({
  components: {
    Bubble,
    Content,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message;
}
</script>
