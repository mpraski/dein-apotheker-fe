<template>
  <div class="list-wrapper">
    <div class="list">
      <Bubble
        v-for="row in rows"
        :key="row.id"
        :selected="selected[row.id]"
        @click.native="onChoose(row.id)"
      >
        <component :is="component" v-bind="enhanceRow(row)" />
      </Bubble>
    </div>
    <template v-if="isMultiple">
      <slot v-if="hasItems" name="selection" :proceed="onProceed"></slot>
      <slot v-else name="none" :proceed="onProceed"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Bubble from '@/components/Bubble.vue'
import { AnswerValue, Row } from '@/store/chat/types'
import { VueConstructor } from 'vue'

export type Mode = 'single' | 'multiple'

@Component({
  components: {
    Bubble
  }
})
export default class List extends Vue {
  @Prop({ default: () => [] })
  private rows!: ReadonlyArray<Row>

  @Prop({ default: 'single' })
  private mode!: Mode

  @Prop()
  private component!: VueConstructor<Vue>

  private selected: { [id: string]: boolean }

  private hasItems!: boolean

  public constructor() {
    super()

    this.selected = {}
    this.hasItems = false
  }

  private onChoose(id: string) {
    if (this.mode === 'single') {
      return this.onSelect(id)
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
    const items = Object.keys(this.selected).map((id) => id)

    this.onSelect(items)
  }

  private get isMultiple(): boolean {
    return this.mode === 'multiple'
  }

  private enhanceRow(row: Row): object {
    return Object.assign(row, { height: 10 })
  }

  @Emit()
  private onSelect(a: AnswerValue): AnswerValue {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.list-wrapper {
  .list {
    @include horizontal-list;
  }
}
</style>
