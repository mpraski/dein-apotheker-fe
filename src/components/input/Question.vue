<template>
  <div class="option-list">
    <Item
      v-for="option in options"
      :key="option.id"
      :content="option.text"
      @click.native="onSelect(option.id)"
    />
    <Placeholder v-if="isEmpty" :text="$t('message.thankYou')" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Item from '@/components/input/item/Item.vue'
import Placeholder from '@/components/input/Placeholder.vue'

import { QuestionOption } from '@/store/chat/types'

@Component({
  components: {
    Item,
    Placeholder
  }
})
export default class Question extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<QuestionOption>

  private get isEmpty(): boolean {
    return this.options.length === 0
  }

  @Emit()
  private onSelect(answer: string): string {
    return answer
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.option-list {
  @include horizontal-list;

  & > div {
    margin-left: $marginSmall;
    margin-bottom: $marginSmall;
  }
}
</style>
