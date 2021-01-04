<template>
  <main>
    <FadeIn class="output">
      <Content v-if="showInput" :content="current.content" />
    </FadeIn>
    <FadeIn>
      <div class="input" v-if="showInput">
        <InputSwitch
          :type="message.type"
          :input="message.input"
          @on-answer="onAnswer"
        />
      </div>
    </FadeIn>
    <TopBar
      @on-refresh="requestSession"
      @on-cart="showPopup(['cart', cart])"
      :cart="cartSize"
      class="top"
    />
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
import Content from '@/components/Content.vue'
import InputSwitch from '@/views/InputSwitch.vue'
import TopBar from '@/views/TopBar.vue'
import Divider from '@/components/Divider.vue'

import { messageNamespace } from '@/store/message'
import { MessageState, Message as CompoundMessage } from '@/store/message/types'

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
    Content,
    InputSwitch,
    TopBar,
    PopupManager,
    Divider
  }
})
export default class Chat extends Vue {
  @message.Getter
  current!: CompoundMessage

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

  private mounted() {
    this.$driver.start()
  }

  private onAnswer(answer: AnswerValue) {
    this.addAnswer({ state: this.state, answer })
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

.top {
  margin-top: auto;
}

.input {
  @extend .padded;
}

.output {
  margin-top: $marginMedium;
  margin-bottom: $marginMedium;
  width: 75%;

  @include responsive-text(21px, 1.75rem, 'PT Serif');
}
</style>
