<template>
  <main>
    <FadeIn>
      <div class="main" v-if="showInput">
        <Content class="output" :content="question" />
        <InputSwitch
          :type="message.type"
          :input="message.input"
          @on-answer="onAnswer"
          @on-chooser="onChooser"
        />
      </div>
    </FadeIn>
    <TopBar
      @on-refresh="requestSession"
      @on-cart="showPopup(['cart', cart])"
      :cart="cartSize"
      class="top"
    />
    <PopupManager :popups="popups" @hide-popup="hidePopup" @hide-all="clear" />
  </main>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { State, Action, namespace } from 'vuex-class'

import FadeIn from '@/components/FadeIn.vue'
import PopupManager from '@/components/PopupManager.vue'
import Content from '@/components/Content.vue'
import InputSwitch from '@/views/InputSwitch.vue'
import TopBar from '@/views/TopBar.vue'

import {
  Answer,
  Input,
  Message,
  Actions as ChatActions,
  Getters as ChatGetters,
  AnswerValue,
  Cart,
  Question,
  Row
} from '@/store/chat/types'
import { chatNamespace } from '@/store/chat'
import { popupNamespace } from '@/store/popup'
import { PopupKey, PopupState } from '@/store/popup/types'

const chat = namespace(chatNamespace)
const popup = namespace(popupNamespace)

@Component({
  components: {
    FadeIn,
    Content,
    InputSwitch,
    TopBar,
    PopupManager
  }
})
export default class Chat extends Vue {
  @State(popupNamespace)
  popups!: PopupState

  @Action
  requestSession!: () => void

  @chat.Getter
  question!: Question

  @chat.Getter
  state!: string

  @chat.State
  message!: Message

  @chat.State
  cart!: Cart

  @chat.State
  showInput!: boolean

  @chat.Action
  addAnswer!: (a: Answer) => void

  @popup.Action
  showPopup!: (d: [PopupKey, any]) => void

  @popup.Action
  hidePopup!: (d: PopupKey) => void

  @popup.Action
  clear!: () => void

  private mounted() {
    this.$driver.start()
  }

  private onAnswer(answer: AnswerValue) {
    this.addAnswer({ state: this.state, answer })
  }

  private onChooser(data: [Row[], (a: AnswerValue) => void]) {
    this.showPopup(['chooser', data])
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

.main {
  @extend .padded;
}

.top {
  margin-top: auto;
}

.input {
  @extend .padded;
}

.output {
  margin-top: $marginMedium;
  margin-bottom: $marginLarge;
  width: 75%;

  @include responsive-text(21px, 1.75rem, 'PT Serif');
  @include hero;
}
</style>
