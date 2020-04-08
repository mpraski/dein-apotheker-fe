<template>
  <div>
    <FadeIn group="true" class="single-list">
      <Item v-for="option in timedOptions" :key="option.id" :option="option" @on-select="onSelect" />
    </FadeIn>
    <FadeIn>
      <Action
        v-if="isActionVisible"
        icon="arrow"
        :content="options[0].content"
        :on-select="() => onSelect(options[0])"
      />
    </FadeIn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Item from '@/components/input/item/Item.vue'
import Action from '@/components/input/Action.vue'
import FadeIn from '@/components/transition/FadeIn.vue'

import { Option } from '@/domain/question'
import { defaultSpread } from '@/utils/timing'

@Component({
  components: {
    Item,
    Action,
    FadeIn
  }
})
export default class Single extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  @Prop({ default: () => () => 0 })
  private onSelect!: (a: Option) => void;

  private timedOptions!: Array<Option>;

  private isActionVisible!: boolean;

  private isSingleItem!: boolean;

  constructor () {
    super()
    this.timedOptions = []
    this.isSingleItem = this.options.length === 1
    this.isActionVisible = false
  }

  private mounted () {
    const actions: Array<() => void> = []

    if (this.isSingleItem) {
      actions.push(() => {
        this.isActionVisible = true
      })
    } else {
      for (let i = 0; i < this.options.length; i++) {
        actions.push(() => {
          this.timedOptions.push(this.options[i])
        })
      }
    }

    defaultSpread(...actions)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  @extend .horizontal-list;
}
</style>
