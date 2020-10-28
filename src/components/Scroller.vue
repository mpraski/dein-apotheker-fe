<template>
  <div class="scroller" ref="scroller">
    <div class="area" :style="areaStyle">
      <div ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator'

export type ScrollType = 'smooth' | 'auto'

@Component({})
export default class Scroller extends Vue {
  @Prop({ default: () => 0 })
  private height!: number

  // prettier-ignore
  $refs!: {
    scroller: HTMLDivElement;
    content: HTMLDivElement;
  }

  public measure() {
    this.onMeasure()
  }

  public scrollToEnd(behaviour: ScrollType = 'smooth') {
    this.$refs.scroller.scrollBy({
      top: this.scrollAmount,
      behavior: behaviour
    })
  }

  @Emit()
  private onMeasure(): [number, number] {
    const scrollerHeight = this.$refs.scroller.clientHeight
    const contentHeight = this.$refs.content.clientHeight

    return [scrollerHeight, contentHeight]
  }

  @Watch('height')
  private onPropertyChanged(value: number, old: number) {
    this.scrollToEnd()
  }

  private get areaStyle(): object {
    return {
      height: `${this.height}px`
    }
  }

  private get scrollAmount(): number {
    return this.height - this.$refs.content.clientHeight
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.scroller {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  .area {
    width: 100%;
    height: 100%;
    direction: inherit;
    box-sizing: border-box !important;
  }
}
</style>
