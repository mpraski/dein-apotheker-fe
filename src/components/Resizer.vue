<template>
  <div />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import debounce from 'lodash.debounce'

@Component({})
export default class Resizer extends Vue {
  @Prop({ default: () => 100 })
  private readonly interval!: number

  private debouncedResize: () => void

  constructor() {
    super()
    this.debouncedResize = debounce(this.onResize, this.interval)
  }

  private created() {
    window.addEventListener('resize', this.debouncedResize)
  }

  private destroyed() {
    window.removeEventListener('resize', this.debouncedResize)
  }

  @Emit()
  private onResize() {
    return 0
  }
}
</script>
