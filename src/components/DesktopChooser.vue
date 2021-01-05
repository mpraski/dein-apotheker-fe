<template>
  <div class="desktop-chooser">
    <Searcher class="searcher" @on-search="setSearch" ref="searcher" />
    <Grid :rows="filtered" :columns="columns" @on-select="onSelect" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { Row } from '@/store/chat/types'
import Searcher from '@/components/Searcher.vue'
import Grid from '@/components/Grid.vue'

@Component({
  components: {
    Searcher,
    Grid
  }
})
export default class DesktopChooser extends Vue {
  @Prop({ default: () => [] })
  private readonly rows!: Row[]

  @Prop({ default: () => 1 })
  private readonly columns!: number

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
  private onSelect(a: string): string {
    return a
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.desktop-chooser {
  .searcher {
    margin-bottom: $marginMedium;
  }
}
</style>
