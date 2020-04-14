<template>
  <div class="chat-container">
    <div class="output-container" ref="chatContainer">
      <FadeIn group="true" delay="true" class="output-list">
        <OutputSwitch
          v-for="([m, a], index) in messages"
          :key="index"
          :message="m"
          :alignment="a"
          @on-delete="rewind(index)"
        />
      </FadeIn>
    </div>
    <div class="input-container">
      <div class="input-list">
        <FadeIn>
          <InputSwitch v-if="showInput" :input="input" :on-answer="onAnswer" />
        </FadeIn>
      </div>
    </div>
    <Resizer @on-resize="scrollToEnd" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

import FadeIn from "@/components/transition/FadeIn.vue";
import Resizer from "@/components/transition/Resizer.vue";
import OutputSwitch from "@/components/output/OutputSwitch.vue";
import InputSwitch from "@/components/input/InputSwitch.vue";

import { messageNamespace } from "@/store/message";
import { MessageState } from "@/store/message/types";
import { inputNamespace } from "@/store/input";
import {
  Input,
  InputState,
  Mutations as InputMutations,
  Getters as InputGetters
} from "@/store/input/types";
import { answerNamespace } from "@/store/answer";
import {
  Answer,
  Record,
  Actions as AnswerActions,
  Getters as AnswerGetters,
  Question
} from "@/store/answer/types";

@Component({
  components: {
    FadeIn,
    Resizer,
    OutputSwitch,
    InputSwitch
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

  @Action(AnswerActions.addRecord, { namespace: answerNamespace })
  addRecord!: (r: Record) => void;

  @Action(AnswerActions.rewind, { namespace: answerNamespace })
  rewind!: (index: number) => void;

  private static readonly scrollAmount: number = 1000;

  $refs!: {
    chatContainer: HTMLElement;
  };

  private updated() {
    this.$nextTick(this.scrollToEnd.bind(this));
  }

  private scrollToEnd() {
    this.$refs.chatContainer.scrollBy({
      top: Chat.scrollAmount,
      behavior: "smooth"
    });
  }

  private onAnswer(a: Answer) {
    const q = this.currentQuestion;
    if (q) {
      this.addRecord({
        questionID: q.ID,
        scenario: q.scenario,
        answer: a
      });
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

  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.02),
    0 6px 30px 5px rgba(0, 0, 0, 0.02), 0 8px 10px -5px rgba(0, 0, 0, 0.1);

  @include respond-to(small) {
    margin-top: $marginRegular;
    margin-bottom: $marginRegular;

    height: calc(100% - 3rem);

    border-radius: $borderRadius;
    border-style: $borderStyle;
    border-width: 0;

    border-color: white;
  }
}

.output-container {
  height: 70%;
  overflow-y: hidden;
}

.output-list {
  @extend .vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginRegular;
}

.input-container {
  height: 30%;

  border-top: 2px solid $secondaryBackgroundColor;
  padding-top: $marginMedium;
}

.input-list {
  @extend .vertical-list;

  margin-left: auto;
  margin-right: auto;

  padding: 0 $marginRegular;
}
</style>
