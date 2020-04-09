<template>
  <div class="item-container" ref="chatContainer">
    <FadeInDelay group="true" class="item-list">
      <Choice v-for="(message, index) in messages" v-bind:key="index" :message="message" />
    </FadeInDelay>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import FadeInDelay from '@/components/transition/FadeInDelay.vue'
import Choice from '@/components/output/Choice.vue'

import { Message } from '@/domain/message'

@Component({
  components: {
    FadeInDelay,
    Choice
  }
})
export default class Chat extends Vue {
  @Prop({ default: () => [] })
  private messages!: Array<Message>;

  private messagesToAdd!: Array<Message>;

  $refs!: {
    chatContainer: HTMLElement;
  };

  constructor () {
    super()
    this.messagesToAdd = [
      {
        type: 'MESSAGE_TEXT',
        content: 'For which **symptom** are you looking for a drug?',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Running nose',
        alignment: 'RIGHT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: "Soon we'll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.",
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Understood',
        alignment: 'RIGHT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'INPUT_MULTIPLE',
        options: [
          {
            id: 'yes',
            content: 'Yes'
          },
          {
            id: 'no',
            content: 'No'
          },
          {
            id: 'maybe',
            content: 'Maybe'
          }
        ]
      }
    ]
  }

  private mounted () {
    setInterval(this.addMessage, 1000)
  }

  private updated () {
    this.$nextTick(this.scrollToEnd)
  }

  private scrollToEnd () {
    const lastChild = this.$el.lastElementChild

    if (lastChild) {
      this.$refs.chatContainer.scrollBy({
        top: lastChild.clientHeight,
        behavior: 'smooth'
      })
    }
  }

  private addMessage () {
    if (this.messagesToAdd.length > 0) {
      const item = this.messagesToAdd.shift()
      if (item) {
        this.messages.push(item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-container {
  height: calc(100vh - 10rem);
  overflow-y: auto;
}

.item-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;
}
</style>
