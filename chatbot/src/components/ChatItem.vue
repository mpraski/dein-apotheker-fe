<template>
  <Message
    v-if="command.type === 'SHOW_MESSAGE'"
    :content="command.message.content"
    :alignment="command.alignment"
  />
  <Single v-else-if="command.type === 'SHOW_SINGLE'" :options="command.options" />
  <Multiple v-else-if="command.type === 'SHOW_MULTIPLE'" :options="command.options" />
  <Prompt v-else-if="command.type === 'SHOW_PROMPT'" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Message from '@/components/input/Message.vue'
import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'

import { Command } from '@/domain/command'

@Component({
  components: {
    Message,
    Single,
    Multiple,
    Prompt
  }
})
export default class ChatItem extends Vue {
  @Prop() private command!: Command;
}
</script>
