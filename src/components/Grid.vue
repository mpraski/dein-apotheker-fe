<template>
  <div class="grid">
    <div class="row" v-for="chunk in chunked" :key="chunk[0].id">
      <div class="column" v-for="(item, idx) in chunk" :key="idx">
        <ListItem v-if="item" v-bind="item" @click.native="onSelect(item.id)">
          <ChevronRight />
        </ListItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Maybe, chunk } from '@/util/util'
import { Row } from '@/store/chat/types'
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import ListItem from '@/components/ListItem.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

@Component({
  components: {
    ListItem,
    ChevronRight
  }
})
export default class Grid extends Vue {
  @Prop({ default: () => 2 })
  private readonly columns!: number

  @Prop({ default: () => [] })
  private readonly rows!: Row[]

  @Emit()
  private onSelect(a: string): string {
    return a
  }

  private get chunked(): Maybe<Row>[][] {
    return chunk(this.rows, this.columns)
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.grid {
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

    border-bottom: 1px solid $borderColor;
  }

  .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;

    &:not(:last-child) {
      border-right: 1px solid $borderColor;
    }
  }
}
</style>
