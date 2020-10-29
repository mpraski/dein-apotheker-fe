<template>
  <div class="desktop-chooser">
    <Searcher @on-search="setSearch" ref="searcher" />
    <DesktopList :rows="filtered" :colums="columns" @on-select="onSelect" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { AnswerValue, Row } from '@/store/chat/types'
import Searcher from '@/components/Searcher.vue'
import DesktopList from '@/components/DesktopList.vue'

@Component({
  components: {
    Searcher,
    DesktopList
  }
})
export default class DesktopChooser extends Vue {
  @Prop({ default: () => [] })
  private rows!: Row[]

  @Prop({ default: () => 2 })
  private columns!: number

  private searchValue = ''

  // prettier-ignore
  $refs!: {
    searcher: Searcher;
  }

  private mounted() {
    this.$refs.searcher.focus()
  }

  private get filtered(): Row[] {
    const key = this.searchValue.toLowerCase()
    const filtered = this.rows.filter(({ name }) =>
      name.toLowerCase().includes(key)
    )

    return filtered
  }

  private setSearch(v: string) {
    this.searchValue = v
  }

  @Emit()
  private onSelect(a: AnswerValue): AnswerValue {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.desktop-chooser {
  @extend .bubble;
}
</style>
