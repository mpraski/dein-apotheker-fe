<template>
  <div class="single-list">
    <Item v-for="option in options" :key="option.id" :option="option" @on-select="onSelect" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Item from '@/components/input/Item.vue'

import { Option } from '@/domain/question'

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
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  @extend .horizontal-list;
}
</style>
