<template>
  <Single
    v-if="input.type === 'single'"
    :options="input.options"
    :on-select="onSingleSelect"
  />
  <Multiple
    v-else-if=" input.type === 'multiple'"
    :options="input.options"
    :on-submit="onMultipleSelect"
  />
  <Prompt v-else-if="input.type === 'prompt'" :on-submit="onPromptSubmit" />
  <End v-else-if="input.type === 'end'" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'
import End from '@/components/input/End.vue'

import { Input, Option } from '@/store/input/types'
import { Answer, AnswerValue } from '@/store/answer/types'

@Component({
  components: {
    Single,
    Multiple,
    Prompt,
    End
  }
})
export default class InputSwitch extends Vue {
  @Prop() private input!: Input;

  @Prop({ default: () => () => 0 })
  private onAnswer!: (v: AnswerValue) => void;

  private onSingleSelect (a: Option) {
    this.onAnswer(a)
  }

  private onMultipleSelect (a: Array<Option>) {
    this.onAnswer(a)
  }

  private onPromptSubmit (a: string) {
    this.onAnswer(a)
  }
}
</script>
