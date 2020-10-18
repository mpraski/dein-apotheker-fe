<template>
  <div class="chat-container">
    <TopBar @on-refresh="requestSession" />
    <SimpleBar
      data-simplebar-auto-hide="true"
      class="output-container"
      ref="outputContainer"
    >
      <FadeIn group="true" class="output-list">
        <OutputSwitch
          v-for="([m, d], index) in messages"
          :key="index"
          :message="m"
          :data="d"
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
import { State, Action, namespace } from 'vuex-class'

import SimpleBar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'

import FadeIn from '@/components/FadeIn.vue'
import Resizer from '@/components/Resizer.vue'
import OutputSwitch from '@/views/OutputSwitch.vue'
import InputSwitch from '@/views/InputSwitch.vue'
import TopBar from '@/views/TopBar.vue'

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

  @Action
  requestSession!: () => void

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
  @include vertical-list;

  margin-left: auto;
  margin-right: auto;
  height: 100%;
  border: none;

  @include respond-to(small) {
    max-width: $chatWidth;
  }
}

.output-container {
  height: 100%;
  overflow-y: auto;

  box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.075);
}

.output-list {
  @include vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginMedium;

  > *:first-child {
    margin-top: $marginMedium;
  }

  > * {
    margin-bottom: $marginMedium;
  }

  @include respond-to(medium) {
    > *:first-child {
      margin-top: $marginRegular;
    }

    > * {
      margin-bottom: $marginRegular;
    }
  }
}

.input-container {
  @include vertical-list;

  min-height: 30%;

  border-radius: 0;
  padding: $marginMedium;

  @include respond-to(medium) {
    padding: $marginRegular;
  }

  @include respond-to(small) {
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
