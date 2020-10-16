<template>
  <Question v-if="type === 'question'" :options="input" @on-select="onAnswer" />
  <Prompt v-else-if="type === 'free'" @on-submit="onAnswer" />
  <Placeholder v-else-if="type === 'end'" :text="$t('message.thankYou')" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Question from '@/components/input/Question.vue'
import Prompt from '@/components/input/Prompt.vue'
import Placeholder from '@/components/input/Placeholder.vue'

import { Input, QuestionType, AnswerValue } from '@/store/chat/types'

@Component({
  components: {
    Question,
    Prompt,
    Placeholder
  }
})
export default class InputSwitch extends Vue {
  @Prop() private type!: QuestionType
  @Prop() private input!: Input

  @Emit()
  private onAnswer(v: AnswerValue): AnswerValue {
    return v
  }
}
</script>
