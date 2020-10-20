<template>
  <main>
    <TopBar @on-refresh="requestSession" />
    <Scroller :height="height" @on-measure="onMeasure" ref="scroller">
      <FadeIn group="true" class="output">
        <OutputSwitch
          v-for="([m, d], i) in messages"
          :key="i"
          :message="m"
          :data="d"
        />
      </FadeIn>
      <FadeIn class="input">
        <InputSwitch
          v-if="showInput"
          :type="message.type"
          :input="message.input"
          @on-answer="onAnswer"
        />
      </FadeIn>
    </Scroller>
    <Resizer @on-resize="scrollToBotton('smooth')" />
  </main>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Action, namespace } from 'vuex-class'

import FadeIn from '@/components/FadeIn.vue'
import Scroller from '@/components/Scroller.vue'
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
import { scrollerNamespace } from '@/store/scroller'

const chat = namespace(chatNamespace)
const message = namespace(messageNamespace)
const scroller = namespace(scrollerNamespace)

@Component({
  components: {
    FadeIn,
    Scroller,
    Resizer,
    OutputSwitch,
    InputSwitch,
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

  @scroller.Getter
  height!: number

  @scroller.Action
  measure!: (n: number) => void

  private readonly scrollAmount: number = 9999

  // prettier-ignore
  $refs!: {
    scroller: Scroller;
  }

  private mounted() {
    this.$driver.start()
    this.scrollToBotton('auto')
  }

  private updated() {
    this.$nextTick(() => this.scrollToBotton())
  }

  private scrollToBotton(behaviour: 'smooth' | 'auto' = 'smooth') {
    this.$refs.scroller.scrollToEnd(this.scrollAmount, behaviour)
  }

  private onAnswer(answer: AnswerValue) {
    this.addAnswer({ state: this.state, answer })
  }

  private onMeasure(contentHeight: number) {
    this.measure(contentHeight)
  }

  @Watch('messages')
  private onPropertyChanged(value: any, old: any) {
    this.$nextTick(() => this.$refs.scroller.measure())
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

main {
  @include vertical-list;

  margin-left: auto;
  margin-right: auto;
  height: 100%;

  @include respond-to(small) {
    max-width: $chatWidth;
  }
}

.input {
  margin-top: $marginMedium;
  padding: 0 $marginMedium;
}

.output {
  @include vertical-list;

  padding: 0 $marginMedium;

  > *:first-child {
    margin-top: $marginRegular;
  }

  > * {
    margin-bottom: $marginMedium;
  }
}
</style>
