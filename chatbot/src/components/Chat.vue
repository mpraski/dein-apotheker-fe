<template>
  <div class="chat-container">
    <TopBar />
    <SimpleBar data-simplebar-auto-hide="true" class="output-container" ref="chatContainer">
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
    <div class="input-container">
      <div class="input-list">
        <FadeIn>
          <InputSwitch v-if="showInput" :input="input" :on-answer="onAnswer" />
        </FadeIn>
      </div>
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
  AnswerValue,
  AnswerType
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

  $refs!: {
    chatContainer: Vue;
  };

  private mounted () {
    this.scrollToEnd('auto')
  }

  private updated () {
    this.$nextTick(() => this.scrollToEnd('smooth'))
  }

  private scrollToEnd (behaviour: 'smooth' | 'auto') {
    const scrollElem = (this.$refs.chatContainer as any).scrollElement
    scrollElem.scrollBy({
      top: Chat.scrollAmount,
      behavior: behaviour
    })
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
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.chat-container {
  @extend .bubble;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: $chatWidth;
  height: 100%;
  border: none;

  @include respond-to(small) {
    margin-top: $marginRegular;
    margin-bottom: $marginRegular;

    height: calc(100% - 3rem);

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

  padding: 0 $marginRegular;
}

.input-container {
  border-top: $borderWidth $borderStyle $buttonBorderColor;
  padding-top: $marginMedium;
  padding-bottom: $marginMedium;
  min-height: 7rem;
}

.input-list {
  @extend .vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginRegular;
}
</style>
