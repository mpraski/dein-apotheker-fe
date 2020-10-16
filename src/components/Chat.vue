<template>
  <div class="chat-container">
    <TopBar />
    <SimpleBar
      data-simplebar-auto-hide="true"
      class="output-container"
      ref="outputContainer"
    >
      <FadeIn group="true" class="output-list">
        <OutputSwitch
          v-for="([m, a], index) in messages"
          :key="index"
          :message="m"
          :alignment="a"
        />
      </FadeIn>
    </SimpleBar>
    <div class="input-container">
      <FadeIn>
        <InputSwitch
          v-if="showInput"
          :type="message.type"
          :input="message.input"
          @on-answer="onAnswer"
        />
      </FadeIn>
    </div>
    <Resizer @on-resize="scrollToEnd('smooth')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

import SimpleBar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'

import FadeIn from '@/components/transition/FadeIn.vue'
import Resizer from '@/components/transition/Resizer.vue'
import OutputSwitch from '@/components/output/OutputSwitch.vue'
import InputSwitch from '@/components/input/InputSwitch.vue'
import TopBar from '@/components/output/TopBar.vue'

import { messageNamespace } from '@/store/message'
import { MessageState } from '@/store/message/types'

import {
  Answer,
  Input,
  Message,
  Actions as ChatActions,
  Getters as ChatGetters,
  AnswerValue
} from '@/store/chat/types'
import { chatNamespace } from '@/store/chat'

const chat = namespace(chatNamespace)
const message = namespace(messageNamespace)

@Component({
  components: {
    FadeIn,
    Resizer,
    OutputSwitch,
    InputSwitch,
    SimpleBar,
    TopBar
  }
})
export default class Chat extends Vue {
  @State(messageNamespace)
  messages!: MessageState

  @chat.Getter
  state!: string

  @chat.Getter
  message!: Message

  @chat.Getter
  showInput!: boolean

  @chat.Action
  addAnswer!: (a: Answer) => void

  private static readonly scrollAmount: number = 9999

  // prettier-ignore
  $refs!: {
    outputContainer: HTMLDivElement;
  }

  private mounted() {
    this.$driver.start()
    this.scrollToEnd('auto')
  }

  private updated() {
    this.$nextTick(() => this.scrollToEnd('smooth'))
  }

  private scrollToEnd(behaviour: 'smooth' | 'auto') {
    const scrollElem = (this.$refs.outputContainer as any).scrollElement
    scrollElem.scrollBy({
      top: Chat.scrollAmount,
      behavior: behaviour
    })
  }

  private onAnswer(answer: AnswerValue) {
    this.addAnswer({ state: this.state, answer })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.chat-container {
  @include bubble;
  @include vertical-list;

  margin-left: auto;
  margin-right: auto;
  height: 100%;
  border: none;

  @include respond-to(medium) {
    height: 75vh;
  }

  @include respond-to(small) {
    max-width: $chatWidth;

    height: 85vh;

    border-radius: $borderRadius;
    border-style: $borderStyle;
    border-width: 0;

    border: $borderWidth $borderStyle $buttonBorderColor;
  }
}

.output-container {
  height: 100%;
  overflow-y: auto;
}

.output-list {
  @include vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginMedium;

  > *:first-child {
    margin-top: $marginMedium;
  }
}

.input-container {
  @include vertical-list;

  min-height: 30%;

  border-radius: 0;
  border-top: $borderWidth $borderStyle $buttonBorderColor;
  padding: $marginMedium $marginMedium ($marginMedium - $marginSmall)
    $marginMedium;

  @include respond-to(small) {
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
