<template>
  <div class="item-container" ref="chatContainer">
    <FadeInDelay group="true" class="item-list">
      <ChatItem v-for="(command, index) in commands" v-bind:key="index" :command="command" />
    </FadeInDelay>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import FadeInDelay from '@/components/transition/FadeInDelay.vue'
import ChatItem from '@/components/ChatItem.vue'

import { Command } from '@/domain/command'

@Component({
  components: {
    FadeInDelay,
    ChatItem
  }
})
export default class Chat extends Vue {
  @Prop({ default: () => [] })
  private commands!: Array<Command>;

  private commandsToAdd!: Array<Command>;

  $refs!: {
    chatContainer: HTMLElement;
  };

  constructor () {
    super()
    this.commandsToAdd = [
      {
        type: 'SHOW_MESSAGE',
        message: {
          content: 'For which **symptom** are you looking for a drug?'
        },
        alignment: 'LEFT'
      },
      {
        type: 'SHOW_MESSAGE',
        message: {
          content: 'Running nose'
        },
        alignment: 'RIGHT'
      },
      {
        type: 'SHOW_MESSAGE',
        message: {
          content:
            "Soon we'll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help."
        },
        alignment: 'LEFT'
      },
      {
        type: 'SHOW_MESSAGE',
        message: {
          content: 'Understood'
        },
        alignment: 'RIGHT'
      },
      {
        type: 'SHOW_MESSAGE',
        message: {
          content: 'Some other question'
        },
        alignment: 'LEFT'
      },
      {
        type: 'SHOW_MULTIPLE',
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
    if (this.commandsToAdd.length > 0) {
      const item = this.commandsToAdd.shift()
      if (item) {
        this.commands.push(item)
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
