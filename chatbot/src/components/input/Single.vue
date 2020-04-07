<template>
  <div class="single-list">
    <transition-group name="list-complete" tag="div" class="tgroup">
      <Item v-for="option in timedOptions" :key="option.id" :option="option" @on-select="onSelect" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Item from '@/components/input/Item.vue'

import { Option } from '@/domain/question'
import { spread } from '@/utils/timing'

@Component({
  components: {
    Item
  }
})
export default class Single extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  @Prop()
  private onSelect!: (a: Option) => void;

  private timedOptions!: Array<Option>;

  constructor () {
    super()
    this.timedOptions = []
  }

  mounted () {
    const actions: Array<() => void> = []

    for (let i = 0; i < this.options.length; i++) {
      actions.push(() => {
        this.timedOptions.push(this.options[i])
      })
    }

    spread(300, 300, ...actions)
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
</style>
