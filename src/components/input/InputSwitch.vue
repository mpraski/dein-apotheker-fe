<template>
  <div ref="inputContainer">
    <Question
      v-if="type === 'question'"
      :options="input"
      @on-select="onAnswer"
    />
    <Prompt v-else-if="input.type === 'free'" @on-submit="onAnswer" />
    <Placeholder v-else-if="type === 'end'" :text="$t('message.thankYou')" />
    <Resizer @on-resize="queueHeightChange" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

import Question from '@/components/input/Question.vue'
import Prompt from '@/components/input/Prompt.vue'
import Placeholder from '@/components/input/Placeholder.vue'
import Resizer from '@/components/transition/Resizer.vue'

import { Input, QuestionType, AnswerValue } from '@/store/chat/types'

@Component({
  components: {
    Question,
    Prompt,
    Placeholder,
    Resizer
  }
})
export default class InputSwitch extends Vue {
  @Prop() private type!: QuestionType
  @Prop() private input!: Input

  // prettier-ignore
  $refs!: {
    inputContainer: HTMLDivElement;
  }

  private queueHeightChange() {
    this.$nextTick(() => {
      const height = this.$refs.inputContainer.clientHeight
      this.onHeightChanged(height)
    })
  }

  @Watch('input', { deep: true, immediate: true })
  private onPropertyChanged() {
    this.queueHeightChange()
  }

  @Emit()
  private onAnswer(v: AnswerValue): AnswerValue {
    return v
  }

  @Emit()
  private onHeightChanged(height: number): number {
    return height
  }
}
</script>
