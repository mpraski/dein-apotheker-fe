<template>
  <div class="list-wrapper">
    <div class="list">
      <Bubble
        v-for="row in rows"
        :key="row.id"
        :selected="selected[row.id]"
        @click.native="onSelect(row.id)"
      >
        <component :is="component" :content="option.content" />
      </Bubble>
    </div>
    <template v-if="isMultiple">
      <slot v-if="hasItems" name="proceed"></slot>
      <slot v-else name="wait"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Bubble from '@/components/output/Bubble.vue'
import { AnswerValue, Row } from '@/store/chat/types'

export type Mode = 'single' | 'multiple'

@Component({
  components: {
    Bubble
  }
})
export default class List extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Row>

  @Prop({ default: 'single' })
  private mode!: Mode

  @Prop()
  private component!: Vue

  private selected: { [id: string]: boolean }

  private hasItems!: boolean

  public constructor() {
    super()

    this.selected = {}
    this.hasItems = false
  }

  private onSelect(id: string) {
    if (this.mode === 'single') {
      return this.onSubmit(id)
    }

    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = true
    }

    this.hasItems = Object.keys(this.selected).length > 0

    this.$forceUpdate()
  }

  private onProceed() {
    if (!this.hasItems) return

    const items = Object.keys(this.selected).map((id) => id)

    this.onSubmit(items)
  }

  private get isMultiple(): boolean {
    return this.mode === 'multiple'
  }

  @Emit()
  private onSubmit(a: AnswerValue): AnswerValue {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';
</style>
