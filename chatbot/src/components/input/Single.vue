<template>
  <div v-if="!isSingleItem" class="single-list">
    <Item v-for="option in options" :key="option.id" :option="option" @on-select="onSelect" />
  </div>
  <Action
    v-else
    icon="arrow"
    :content="options[0].content"
    :on-select="() => onSelect(options[0])"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Item from '@/components/input/item/Item.vue'
import Action from '@/components/input/Action.vue'
import FadeIn from '@/components/transition/FadeIn.vue'

import { Option } from '@/domain/question'

@Component({
  components: {
    Item,
    Action,
    FadeIn
  }
})
export default class Single extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  @Prop({ default: () => () => 0 })
  private onSelect!: (a: Option) => void;

  private get isSingleItem (): boolean {
    return this.options.length === 1
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  @extend .horizontal-list;
}
</style>
