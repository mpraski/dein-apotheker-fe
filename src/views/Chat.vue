<template>
  <main>
    <TopBar
      @on-refresh="requestSession"
      @on-cart="showPopup(['cart', cart])"
      :cart="cartSize"
    />
    <Scroller :height="height" @on-measure="measure" ref="scroller">
      <FadeIn group="true" class="output">
        <OutputSwitch
          v-for="([m, d], i) in messages"
          :key="i"
          :message="m"
          :data="d"
          @on-delete="revert([i, d.state])"
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
    <PopupManager :popups="popups" @hide-popup="hidePopup" />
    <Resizer @on-resize="recalculate('smooth')" />
  </main>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Action, namespace } from 'vuex-class'

import FadeIn from '@/components/FadeIn.vue'
import Scroller, { ScrollType } from '@/components/Scroller.vue'
import Resizer from '@/components/Resizer.vue'
import PopupManager from '@/components/PopupManager.vue'
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
  AnswerValue,
  Cart
} from '@/store/chat/types'
import { chatNamespace } from '@/store/chat'
import { scrollerNamespace } from '@/store/scroller'
import { popupNamespace } from '@/store/popup'
import { PopupKey, PopupState } from '@/store/popup/types'

const chat = namespace(chatNamespace)
const message = namespace(messageNamespace)
const scroller = namespace(scrollerNamespace)
const popup = namespace(popupNamespace)

@Component({
  components: {
    FadeIn,
    Scroller,
    Resizer,
    OutputSwitch,
    InputSwitch,
    TopBar,
    PopupManager
  }
})
export default class Chat extends Vue {
  @State(messageNamespace)
  messages!: MessageState

  @State(popupNamespace)
  popups!: PopupState

  @Action
  requestSession!: () => void

  @Action
  computeScreen!: () => void

  @chat.Getter
  state!: string

  @chat.Getter
  message!: Message

  @chat.Getter
  cart!: Cart

  @chat.Getter
  showInput!: boolean

  @chat.Action
  addAnswer!: (a: Answer) => void

  @chat.Action
  revert!: (a: [number, string]) => void

  @scroller.Getter
  height!: number

  @scroller.Action
  measure!: (d: [number, number]) => void

  @popup.Action
  showPopup!: (d: [PopupKey, any]) => void

  @popup.Action
  hidePopup!: (d: PopupKey) => void

  // prettier-ignore
  $refs!: {
    scroller: Scroller;
  }

  private mounted() {
    this.$driver.start()
    this.recalculate('auto')
  }

  private updated() {
    this.$nextTick(() => this.scrollToBotton('smooth'))
  }

  private scrollToBotton(behaviour: ScrollType) {
    this.$refs.scroller.scrollToEnd(behaviour)
  }

  private recalculate(behaviour: ScrollType) {
    this.$refs.scroller.measure()
    this.scrollToBotton(behaviour)
    this.computeScreen()
  }

  private onAnswer(answer: AnswerValue) {
    this.addAnswer({ state: this.state, answer })
  }

  @Watch('messages')
  private onPropertyChanged(value: any, old: any) {
    this.$nextTick(() => this.$refs.scroller.measure())
  }

  private get cartSize(): number {
    return Object.keys(this.cart).length
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
  margin-left: $marginMedium;
  margin-right: $marginMedium;

  @include respond-to(small) {
    margin-left: $marginRegular;
    margin-right: $marginRegular;
  }
}

.output {
  @include vertical-list;

  padding: 0 $marginMedium;

  > *:first-child {
    margin-top: $marginMedium;
  }

  > * {
    margin-bottom: $marginMedium;
  }

  @include respond-to(small) {
    padding: 0 $marginRegular;

    > *:first-child {
      margin-top: $marginRegular;
    }

    > * {
      margin-bottom: $marginRegular;
    }
  }
}
</style>
