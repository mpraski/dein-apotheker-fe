<template>
  <div class="desktop-buyer-wrapper">
    <div class="possibilities">
      <div class="action">
        <BasketOutline class="icon" />
        <p class="text">My recommendation</p>
      </div>
      <div class="action" @click="onProceed" :class="actionClass">
        <p v-if="hasItems" class="text">
          {{ $t('cart.add', { items: this.noItems }) }}
        </p>
        <p v-else class="text">{{ $t('cart.skip') }}</p>
        <ArrowRightThinCircleOutline class="icon" />
      </div>
    </div>
    <div class="desktop-buyer">
      <div class="row" v-for="chunk in chunked" :key="chunk[0].id">
        <div class="column" v-for="(item, idx) in chunk" :key="idx">
          <DesktopChooserItem
            v-if="item"
            v-bind="item"
            :selected="selected[item.id]"
            @click.native="onChoose(item.id)"
          >
            <component :is="iconFor(item.id)" />
          </DesktopChooserItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from '@/store/chat/types'
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import DesktopChooserItem from '@/components/DesktopChooserItem.vue'
import BasketOutline from 'vue-material-design-icons/BasketOutline.vue'
import ArrowRightThinCircleOutline from 'vue-material-design-icons/ArrowRightThinCircleOutline.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import Check from 'vue-material-design-icons/CheckCircle.vue'

type Maybe<T> = T | undefined

@Component({
  components: {
    DesktopChooserItem,
    BasketOutline,
    ArrowRightThinCircleOutline,
    ChevronRight,
    Check
  }
})
export default class DesktopBuyer extends Vue {
  @Prop({ default: () => 2 })
  private columns!: number

  @Prop({ default: () => [] })
  private products!: Product[]

  private selected: Record<string, boolean>

  private hasItems!: boolean

  private noItems!: number

  public constructor() {
    super()

    this.selected = {}
    this.hasItems = false
    this.noItems = 0
  }

  private onChoose(id: string) {
    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = true
    }

    this.noItems = Object.keys(this.selected).length

    this.hasItems = this.noItems > 0

    this.$forceUpdate()
  }

  private onProceed() {
    this.onSelect(Object.keys(this.selected))
  }

  private iconFor(id: string) {
    if (this.selected[id]) {
      return Check
    }

    return ChevronRight
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

  @Emit()
  private onSelect(a: string[]): string[] {
    return a
  }

  private get chunked(): Maybe<Product>[][] {
    return this.chunk(this.products, this.columns)
  }

  private get actionClass(): object {
    return { selected: this.hasItems }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.desktop-buyer-wrapper {
  @extend .bubble;

  .desktop-buyer {
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

  .possibilities {
    @extend .padded;
    @include horizontal-list(space-between);

    align-items: center;
    border-bottom: 1px solid $borderColor;

    .action {
      @include horizontal-list;

      cursor: pointer;
      align-items: center;

      .icon {
        @include big-icon;
      }

      .text {
        color: $textColorSecondary;
        margin: 0 $marginMedium;
      }

      &.selected {
        .icon,
        .text {
          color: $accentColorDarkest;
        }
      }
    }
  }
}
</style>
