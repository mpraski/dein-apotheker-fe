<template>
  <div v-if="!isSingleItem" class="single-list">
    <Item
      v-for="option in options"
      :key="option.id"
      :content="option.content"
      @click.native="onSelect(option)"
    />
  </div>
  <Action
    v-else
    icon="arrow"
    :content="options[0].content"
    :on-select="() => onSelect(options[0])"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Item from '@/components/input/item/Item.vue'
import Action from '@/components/input/Action.vue'

import { Option } from '@/store/input/types'

@Component({
  components: {
    Item,
    Action
  }
})
export default class Single extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  private get isSingleItem (): boolean {
    return this.options.length === 1
  }

  @Emit()
  private onSelect (a: Option): Option {
    return a
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  @extend .horizontal-list;
}
</style>
