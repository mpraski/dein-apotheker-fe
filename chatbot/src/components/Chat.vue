<template>
  <div>
    <div class="output-container" ref="chatContainer">
      <FadeIn group="true" delay="true" class="output-list">
        <OutputSwitch
          v-for="([m, a], index) in messages"
          v-bind:key="index"
          :message="m"
          :alignment="a"
        />
      </FadeIn>
    </div>
    <div class="input-container">
      <div class="input-list">
        <FadeIn>
          <InputSwitch v-if="showInput" :input="stateInput.input" :on-answer="onAnswer" />
        </FadeIn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import FadeIn from '@/components/transition/FadeIn.vue'
import OutputSwitch from '@/components/output/OutputSwitch.vue'
import InputSwitch from '@/components/input/InputSwitch.vue'

import { messageNamespace } from '@/store/message'
import { MessageState } from '@/store/message/types'
import { inputNamespace } from '@/store/input'
import { InputState, Mutations as InputMutations } from '@/store/input/types'
import { answerNamespace } from '@/store/answer'
import {
  Answer,
  Record,
  Actions as AnswerActions,
  Getters as AnswerGetters
} from '@/store/answer/types'

@Component({
  components: {
    FadeIn,
    OutputSwitch,
    InputSwitch
  }
})
export default class Chat extends Vue {
  @State(messageNamespace)
  messages!: MessageState;

  @State(inputNamespace)
  stateInput!: InputState;

  @Getter(InputMutations.showInput, { namespace: inputNamespace })
  showInput!: boolean;

  @Getter(AnswerGetters.currentQuestionID, { namespace: answerNamespace })
  currentQuestionID?: string;

  @Action(AnswerActions.addRecord, { namespace: answerNamespace })
  addRecord!: (r: Record) => void;

  private static readonly scrollAmount: number = 1000;

  $refs!: {
    chatContainer: HTMLElement;
  };

  private updated () {
    this.$nextTick(this.scrollToEnd.bind(this))
  }

  private scrollToEnd () {
    this.$refs.chatContainer.scrollBy({
      top: Chat.scrollAmount,
      behavior: 'smooth'
    })
  }

  private onAnswer (a: Answer) {
    const id = this.currentQuestionID
    if (id) {
      this.addRecord({
        QuestionID: id,
        answer: a
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.output-container {
  height: 67vh;
  overflow-y: hidden;
}

.output-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;

  padding: 0 0.5rem;
}

.input-container {
  height: 33vh;
}

.input-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;

  padding: 0 0.5rem;
}
</style>
