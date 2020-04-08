<template>
  <div>
    <div class="fixed-height" ref="chatContainer">
      <FadeInDelay group="true" class="message-list">
        <Message
          v-for="message in messages"
          v-bind:key="message[0]"
          :content="message[0]"
          :alignment="message[1]"
        />
      </FadeInDelay>
    </div>
    <div class="message-list">
      <!--<Single :options="options2" :onSelect="onSelect" />-->
      <Multiple :options="options" :onSubmit="onSubmit" />
      <!--<Prompt />-->
      <!--<Action content="Add message" :on-select="addMessage" />-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Message from '@/components/Message.vue'
import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'
import Action from '@/components/input/Action.vue'
import FadeInDelay from '@/components/transition/FadeInDelay.vue'

import { Option } from '@/domain/question'

@Component({
  components: {
    Message,
    Single,
    Multiple,
    Prompt,
    Action,
    FadeInDelay
  }
})
export default class Chat extends Vue {
  @Prop({ default: () => [] })
  private messages!: Array<[string, 'left' | 'right']>;

  $refs!: {
    chatContainer: HTMLElement;
  };

  constructor () {
    super()
    this.messages = [
      ['For which **symptom** are you looking for a drug?', 'left'],
      ['Running nose', 'right'],
      [
        "Soon we'll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.",
        'left'
      ]
    ]
  }

  get complexMarkdown (): string {
    return 'Soon we\'ll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.'
  }

  get options (): ReadonlyArray<Option> {
    return [
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
      },
      {
        id: 'maybe2',
        content: 'Maybe'
      },
      {
        id: 'maybe3',
        content: 'Maybe'
      },
      {
        id: 'maybe4',
        content: 'Maybe'
      }
    ]
  }

  get options2 (): ReadonlyArray<Option> {
    return [
      {
        id: 'understood',
        content: 'Understood'
      }
    ]
  }

  private mounted () {
    setInterval(this.addMessage, 1000)
  }

  private updated () {
    this.$nextTick(this.scrollToEnd)
  }

  private onSelect (o: Option) {
    console.log(o)
  }

  private onSubmit (os: ReadonlyArray<Option>) {
    console.log(os)
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
    this.messages.push([
      Math.random()
        .toString(36)
        .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      Math.random() < 0.5 ? 'left' : 'right'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.message-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;
}

.fixed-height {
  height: calc(100vh - 20rem);
  overflow-y: auto;
}
</style>
