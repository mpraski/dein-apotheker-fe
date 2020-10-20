<template>
  <div class="chooser-wrapper">
    <div class="chooser">
      <div class="row" v-for="[a, b] in chunked" :key="a.id">
        <div class="column">
          <ChooserItem v-bind="a" @click.native="onChoose(a.id)" />
        </div>
        <div class="column">
          <ChooserItem v-if="b" v-bind="b" @click.native="onChoose(b.id)" />
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

  private chunk<T>(list: T[]): [T, T][] {
    let i, j: number
    const arr: [T, T][] = []

    for (i = 0, j = list.length; i < j; i += 2) {
      arr.push(list.slice(i, i + 2) as [T, T])
    }

    return arr
  }

  private get chunked(): [Row, Row][] {
    return this.chunk(this.rows)
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

    max-height: 10rem;

    @include respond-to(small) {
      max-height: 10rem;
    }

    @include respond-to(medium) {
      max-height: 14rem;
    }

    @include respond-to(large) {
      max-height: 16.15rem;
    }

    overflow-y: auto;

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;

      &:not(:last-child) {
        border-bottom: 1px solid $borderColor;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;

      &:first-child {
        border-right: 1px solid $borderColor;
      }
    }
  }
}
</style>
