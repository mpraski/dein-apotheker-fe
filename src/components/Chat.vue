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
    <div class="input-container" ref="inputContainer" :style="inputStyle">
      <FadeIn>
        <InputSwitch
          v-if="input"
          :type="message.type"
          :input="message.input"
          @on-answer="onAnswer"
          @on-height-changed="onInputHeight"
        />
      </FadeIn>
    </div>
    <Resizer @on-resize="scrollToEnd('smooth')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

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
  Getters as ChatGetters
} from '@/store/chat/types'
import { chatNamespace } from '@/store/chat'

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

  @Getter(ChatGetters.message, { namespace: chatNamespace })
  message!: Message

  @Getter(ChatGetters.input, { namespace: chatNamespace })
  input!: boolean

  @Action(ChatActions.addAnswer, { namespace: chatNamespace })
  addAnswer!: (a: Answer) => void

  private static readonly scrollAmount: number = 9999

  private inputHeight = 'auto'

  // prettier-ignore
  $refs!: {
    outputContainer: HTMLDivElement;
    inputContainer: HTMLDivElement;
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

  private onInputHeight(height: number) {
    this.inputHeight = `${height}px`
  }

  private onAnswer(answer: Answer) {
    this.addAnswer(answer)
  }

  private get inputStyle(): object {
    return {
      minHeight: this.inputHeight
    }
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

    margin-top: $marginRegular;
    margin-bottom: $marginRegular;

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
}

.input-container {
  @include vertical-list;

  background-color: $secondaryBackgroundColor;
  border-radius: 0;
  border-top: $borderWidth $borderStyle $buttonBorderColor;
  padding: $marginMedium $marginMedium ($marginMedium - $marginSmall)
    $marginMedium;

  transition: min-height $animationDuration ease;

  @include respond-to(small) {
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
