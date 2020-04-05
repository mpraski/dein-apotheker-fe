<template>
  <div class="message-list">
    <Message v-once content="For which **symptom** are you looking for a drug?" alignment="left"></Message>
    <Message v-once content="Running nose" alignment="right"></Message>
    <Message v-once content="Do you have a running nose?" alignment="left"></Message>
    <Message v-once :content="complexMarkdown" alignment="left"></Message>
    <Multiple />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Message from '@/components/Message.vue'
import Single from '@/components/answer/Single.vue'
import Multiple from '@/components/answer/Multiple.vue'

@Component({
  components: {
    Message,
    Single,
    Multiple
  }
})
export default class Chat extends Vue {
  get complexMarkdown (): string {
    return 'Soon we\'ll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.'
  }
}
</script>

<style scoped lang="scss">
.message-list {
  max-width: 40rem;

  margin-left: auto;
  margin-right: auto;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
}
</style>
