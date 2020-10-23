<template>
  <div class="chooser-wrapper">
    <div class="chooser">
      <div class="row" v-for="chunk in chunked" :key="chunk[0].id">
        <div class="column" v-for="item in chunk" :key="item.id">
          <ChooserItem v-bind="item" @click.native="onChoose(item.id)" />
        </div>
      </div>
    </div>
    <template v-if="isMultiple">
      <slot v-if="hasItems" name="selection" :proceed="onProceed"></slot>
      <slot v-else name="none" :proceed="onProceed"></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import ChooserItem from '@/components/ChooserItem.vue'
import { AnswerValue, Row } from '@/store/chat/types'

export type Mode = 'single' | 'multiple'

@Component({
  components: {
    ChooserItem
  }
})
export default class Chooser extends Vue {
  @Prop({ default: () => [] })
  private rows!: Array<Row>

  @Prop({ default: () => 'single' })
  private mode!: Mode

  @Prop({ default: () => 2 })
  private columns!: number

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
    const items = Object.keys(this.selected)

    this.onSelect(items)
  }

  private chunk<T>(list: T[], size = 2): T[][] {
    let i, j: number
    const arr: T[][] = []

    for (i = 0, j = list.length; i < j; i += size) {
      arr.push(list.slice(i, i + size))
    }

    return arr
  }

  private get chunked(): Row[][] {
    return this.chunk(this.rows, this.columns)
  }

  private get isMultiple(): boolean {
    return this.mode === 'multiple'
  }

  @Emit()
  private onSelect(a: AnswerValue): AnswerValue {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.chooser-wrapper {
  .chooser {
    @extend .bubble;

    &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: $textColorSecondary;
    }

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;

      &:not(:last-child) {
        border-bottom: 2px solid $borderColor;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;

      &:not(:last-child) {
        border-right: 2px solid $borderColor;
      }
    }
  }
}
</style>
