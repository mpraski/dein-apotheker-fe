<template>
  <Bubble v-if="message.type === 'MESSAGE_TEXT'" :alignment="message.alignment">
    <Content :content="message.content" />
  </Bubble>
  <Single v-else-if="message.type === 'INPUT_SINGLE'" :options="message.options" />
  <Multiple v-else-if="message.type === 'INPUT_MULTIPLE'" :options="message.options" />
  <Prompt v-else-if="message.type === 'INPUT_PROMPT'" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Bubble from '@/components/output/Bubble.vue'
import Content from '@/components/output/Content.vue'
import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'

import { Message } from '@/domain/message'

@Component({
  components: {
    Bubble,
    Content,
    Single,
    Multiple,
    Prompt
  }
})
export default class Choice extends Vue {
  @Prop() private message!: Message;
}
</script>
