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

  public scrollToEnd(top: number, behaviour: 'smooth' | 'auto' = 'smooth') {
    this.$refs.scroller.scrollBy({
      top: top,
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
    this.scrollToEnd(9999)
  }

  private get areaStyle(): object {
    return {
      height: `${this.height}px`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.scroller {
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  .area {
    width: 100%;
    height: 100%;
    direction: inherit;
    box-sizing: border-box !important;
  }
}
</style>
