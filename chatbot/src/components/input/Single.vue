<template>
  <div class="single-list">
    <transition-group v-if="!isSingleItem" name="fade" tag="div" class="tgroup">
      <Item v-for="option in timedOptions" :key="option.id" :option="option" @on-select="onSelect" />
    </transition-group>
    <transition name="fade">
      <Action
        v-if="isActionVisible"
        icon="arrow"
        :content="options[0].content"
        :on-select="() => onSelect(options[0])"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Item from '@/components/input/item/Item.vue'
import Action from '@/components/input/Action.vue'

import { Option } from '@/domain/question'
import { defaultSpread } from '@/utils/timing'

@Component({
  components: {
    Item,
    Action
  }
})
export default class Single extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  @Prop()
  private onSelect!: (a: Option) => void;

  private timedOptions!: Array<Option>;

  private isActionVisible!: boolean;

  private isSingleItem!: boolean;

  constructor () {
    super()
    this.timedOptions = []
    this.isSingleItem = this.options.length === 1
    this.isActionVisible = false
  }

  private mounted () {
    const actions: Array<() => void> = []

    if (this.isSingleItem) {
      actions.push(() => {
        this.isActionVisible = true
      })
    } else {
      for (let i = 0; i < this.options.length; i++) {
        actions.push(() => {
          this.timedOptions.push(this.options[i])
        })
      }
    }

    defaultSpread(...actions)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  & > div.tgroup {
    @extend .horizontal-list;
  }
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
}

.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
