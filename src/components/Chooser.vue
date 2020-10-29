<template>
  <div class="chooser-wrapper">
    <div class="searcher">
      <MagnifyIcon class="icon" /><input
        class="field"
        type="text"
        placeholder="Search"
        v-model="searchValue"
        ref="searchInput"
        autofocus
      />
    </div>
    <div class="chooser">
      <div class="row" v-for="chunk in chunkedSearched" :key="chunk[0].id">
        <div class="column" v-for="(item, idx) in chunk" :key="idx">
          <ChooserItem
            v-if="item"
            v-bind="item"
            @click.native="onSelect(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import ChooserItem from '@/components/ChooserItem.vue'
import { AnswerValue, Row } from '@/store/chat/types'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'

type Maybe<T> = T | undefined

@Component({
  components: {
    ChooserItem,
    MagnifyIcon
  }
})
export default class Chooser extends Vue {
  @Prop({ default: () => [] })
  private rows!: Row[]

  @Prop({ default: () => 2 })
  private columns!: number

  private searchValue = ''

  // prettier-ignore
  $refs!: {
    searchInput: HTMLInputElement;
  }

  private mounted() {
    this.$refs.searchInput.focus()
  }

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

  private get chunkedSearched(): Maybe<Row>[][] {
    const key = this.searchValue.toLowerCase()
    const filtered = this.rows.filter(({ name }) =>
      name.toLowerCase().includes(key)
    )

    return this.chunk(filtered, this.columns)
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
  @extend .bubble;

  .searcher {
    @extend .padded;
    @include horizontal-list(flex-start, center);

    border-bottom: 2px solid $borderColor;

    .icon {
      @include big-icon(2rem);
    }

    .field {
      @extend .margin-left;
    }
  }

  .chooser {
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

      border-bottom: 2px solid $borderColor;
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
