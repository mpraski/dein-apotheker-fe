<template>
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
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'

@Component({
  components: {
    MagnifyIcon
  }
})
export default class Searcher extends Vue {
  private searchValue = ''

  // prettier-ignore
  $refs!: {
    searchInput: HTMLInputElement;
  }

  public focus() {
    this.$refs.searchInput.focus()
  }

  @Watch('searchValue')
  private onPropertyChanged(value: string, _: string) {
    this.onSearch(value)
  }

  @Emit()
  private onSearch(v: string): string {
    return v
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.searcher {
  @extend .padded;
  @include horizontal-list(flex-start, center);

  align-items: center;

  border-bottom: 1px solid $borderColor;

  .icon {
    @include big-icon;
  }

  .field {
    margin-left: $marginSmall;
  }
}
</style>
