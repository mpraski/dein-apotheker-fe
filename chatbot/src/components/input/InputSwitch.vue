<template>
  <div ref="inputContainer">
    <Single v-if="input.type === 'single'" :options="input.options" @on-select="onSingleSelect" />
    <Multiple
      v-else-if=" input.type === 'multiple'"
      :options="input.options"
      @on-submit="onMultipleSelect"
    />
    <Prompt v-else-if="input.type === 'prompt'" @on-submit="onPromptSubmit" />
    <Placeholder v-else-if="input.type === 'begin'" text="Please hang on" padded="true" />
    <Placeholder v-else-if="input.type === 'end'" text="Thank you for the chat" />
    <Resizer @on-resize="queueHeightChange" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'
import Placeholder from '@/components/input/Placeholder.vue'
import Resizer from '@/components/transition/Resizer.vue'

import { Input, Option } from '@/store/input/types'
import { AnswerValue } from '@/store/answer/types'

@Component({
  components: {
    Single,
    Multiple,
    Prompt,
    Placeholder,
    Resizer
  }
})
export default class InputSwitch extends Vue {
  @Prop() private input!: Input;

  $refs!: {
    inputContainer: HTMLDivElement;
  };

  private onSingleSelect (a: Option) {
    this.onAnswer(a)
  }

  private onMultipleSelect (a: Array<Option>) {
    this.onAnswer(a)
  }

  private onPromptSubmit (a: string) {
    this.onAnswer(a)
  }

  private queueHeightChange () {
    this.$nextTick(() => {
      const height = this.$refs.inputContainer.clientHeight
      this.onHeightChanged(height)
    })
  }

  @Watch('input', { deep: true, immediate: true })
  private onPropertyChanged () {
    this.queueHeightChange()
  }

  @Emit()
  private onAnswer (v: AnswerValue): AnswerValue {
    return v
  }

  @Emit()
  private onHeightChanged (height: number): number {
    return height
  }
}
</script>
