<template>
  <div class="options" :class="optionsClass">
    <Option
      v-for="option in options"
      :key="option.id"
      :content="option.text"
      @click.native="onSelect(option.id)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Option from '@/components/Option.vue'

import { QuestionOption } from '@/store/chat/types'

@Component({
  components: {
    Option
  }
})
export default class Options extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<QuestionOption>

  @Emit()
  private onSelect(answer: string): string {
    return answer
  }

  private get optionsClass(): object {
    return {
      short: this.options.length < 3,
      long: this.options.length >= 3
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.options {
  > * {
    margin-bottom: $marginMedium;
  }

  @include vertical-list(flex-end);
}
</style>
