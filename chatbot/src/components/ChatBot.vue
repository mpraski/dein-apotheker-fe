<template>
  <div class="message-list">
    <Message v-once content="For which **symptom** are you looking for a drug?" alignment="left"></Message>
    <Message v-once content="Running nose" alignment="right"></Message>
    <Message v-once content="Do you have a running nose?" alignment="left"></Message>
    <Message v-once :content="complexMarkdown" alignment="left"></Message>
    <Prompt></Prompt>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Message from '@/components/Message.vue'
import Prompt from '@/components/Prompt.vue'

@Component({
  components: {
    Message,
    Prompt
  }
})
export default class ChatBot extends Vue {
  @Prop() private msg!: string;

  get complexMarkdown (): string {
    return 'Soon we\'ll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.'
  }
}
</script>

<style scoped lang="scss">
.message-list {
  max-width: 36rem;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
}
</style>
