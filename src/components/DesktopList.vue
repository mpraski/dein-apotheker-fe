<template>
  <div class="desktop-list">
    <div class="row" v-for="chunk in chunked" :key="chunk[0].id">
      <div class="column" v-for="(item, idx) in chunk" :key="idx">
        <DesktopChooserItem
          v-if="item"
          v-bind="item"
          @click.native="onSelect(item.id)"
        >
        </DesktopChooserItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Row } from '@/store/chat/types'
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import DesktopChooserItem from '@/components/DesktopChooserItem.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

type Maybe<T> = T | undefined

@Component({
  components: {
    DesktopChooserItem,
    ChevronRight
  }
})
export default class DesktopList extends Vue {
  @Prop({ default: () => 2 })
  private columns!: number

  @Prop({ default: () => [] })
  private rows!: Row[]

  private chunk<T>(list: T[], size = 2): Maybe<T>[][] {
    let i, j: number
    const arr: Maybe<T>[][] = []

    for (i = 0, j = list.length; i < j; i += size) {
      arr.push(list.slice(i, i + size))
    }

    const last = arr[arr.length - 1]

    while (j < i) {
      last.push(undefined)
      j++
    }

    return arr
  }

  @Emit()
  private onSelect(a: string): string {
    return a
  }

  private get chunked(): Maybe<Row>[][] {
    return this.chunk(this.rows, this.columns)
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.desktop-list {
  height: 25vh;
  max-height: 18rem;
  overflow-y: auto;

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

    &:first-child {
      margin-top: $marginSmall;
    }

    &:last-child {
      margin-bottom: $marginSmall;
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
  }
}
</style>
