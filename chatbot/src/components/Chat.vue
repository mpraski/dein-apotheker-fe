<template>
  <div class="chat-container">
    <TopBar />
    <SimpleBar data-simplebar-auto-hide="true" class="output-container" ref="outputContainer">
      <FadeIn group="true" delay="true" class="output-list">
        <OutputSwitch
          v-for="([m, a], index) in messages"
          :key="index"
          :message="m"
          :alignment="a"
          @on-delete="rewind(index)"
        />
      </FadeIn>
    </SimpleBar>
    <div class="input-container" ref="inputContainer" :style="inputStyle">
      <FadeIn>
        <InputSwitch
          v-if="showInput"
          :input="input"
          @on-answer="onAnswer"
          @on-height-changed="onInputHeight"
        />
      </FadeIn>
    </div>
    <Resizer @on-resize="scrollToEnd('smooth')" />
    <PopupManager />
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
import PopupManager from '@/components/output/PopupManager.vue'
import TopBar from '@/components/output/TopBar.vue'

import { messageNamespace } from '@/store/message'
import { MessageState } from '@/store/message/types'
import { inputNamespace } from '@/store/input'
import { Input, Getters as InputGetters } from '@/store/input/types'
import { answerNamespace } from '@/store/answer'
import {
  Answer,
  Actions as AnswerActions,
  Getters as AnswerGetters,
  Question,
  AnswerValue
} from '@/store/answer/types'

@Component({
  components: {
    FadeIn,
    Resizer,
    OutputSwitch,
    InputSwitch,
    SimpleBar,
    TopBar,
    PopupManager
  }
})
export default class Chat extends Vue {
  @State(messageNamespace)
  messages!: MessageState;

  @Getter(InputGetters.input, { namespace: inputNamespace })
  input!: Input;

  @Getter(InputGetters.showInput, { namespace: inputNamespace })
  showInput!: boolean;

  @Getter(AnswerGetters.currentQuestion, { namespace: answerNamespace })
  currentQuestion?: Question;

  @Action(AnswerActions.addAnswer, { namespace: answerNamespace })
  addAnswer!: (a: Answer) => void;

  @Action(AnswerActions.rewind, { namespace: answerNamespace })
  rewind!: (index: number) => void;

  private static readonly scrollAmount: number = 9999;

  private inputHeight = 'auto';

  $refs!: {
    outputContainer: HTMLDivElement;
    inputContainer: HTMLDivElement;
  };

  private mounted () {
    this.scrollToEnd('auto')
  }

  private updated () {
    this.$nextTick(() => this.scrollToEnd('smooth'))
  }

  private scrollToEnd (behaviour: 'smooth' | 'auto') {
    const scrollElem = (this.$refs.outputContainer as any).scrollElement
    scrollElem.scrollBy({
      top: Chat.scrollAmount,
      behavior: behaviour
    })
  }

  private onInputHeight (height: number) {
    this.inputHeight = `${height}px`

    // Beetiful sheetcoed
    const fun = this.scrollToEnd.bind(this, 'smooth')
    setTimeout(fun, 500)
  }

  private onAnswer (value: AnswerValue) {
    const question = this.currentQuestion
    if (question) {
      this.addAnswer({
        ID: question.ID,
        type: question.input.type,
        value: value
      })
    }
  }

  private get inputStyle (): object {
    return {
      minHeight: this.inputHeight
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.chat-container {
  @include bubble;
  @extend .vertical-list;

  padding: 0 !important;
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
  @extend .vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginMedium;
}

.input-container {
  @extend .vertical-list;

  background-color: $secondaryBackgroundColor;
  border-radius: 0;
  border-top: $borderWidth $borderStyle $buttonBorderColor;
  padding: $marginMedium $marginMedium ($marginMedium - $marginSmall)
    $marginMedium;

  transition: min-height $animationDuration ease-in-out;

  @include respond-to(small) {
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
  }
}
</style>
