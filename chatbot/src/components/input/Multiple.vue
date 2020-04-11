<template>
  <div>
    <div class="multiple-list">
      <ItemSelectible
        v-for="option in options"
        :key="option.id"
        :content="option.content"
        :selected="selected[option.id]"
        @click.native="onSelect(option.id)"
      />
    </div>
    <Action
      content="Proceed"
      icon="arrow"
      :enabled="hasItems"
      :on-select="onProceed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/ArrowRight.vue'

import Action from '@/components/input/Action.vue'
import ItemSelectible from '@/components/input/item/ItemSelectible.vue'
import FadeIn from '@/components/transition/FadeIn.vue'

import { Option } from '@/store/input/types'

@Component({
  components: {
    ItemSelectible,
    Action,
    CloseIcon,
    FadeIn
  }
})
export default class Multiple extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

  @Prop()
  private onSubmit!: (a: ReadonlyArray<Option>) => void;

  private selected: { [id: string]: boolean };

  private hasItems!: boolean;

  public constructor () {
    super()
    this.selected = {}
    this.hasItems = false
  }

  private onSelect (id: string) {
    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = true
    }

    this.hasItems = Object.keys(this.selected).length > 0
    this.$forceUpdate()
  }

  private onProceed () {
    if (!this.hasItems) return

    const items = Object.keys(this.selected).map(id =>
      this.options.find(option => option.id === id)
    ) as ReadonlyArray<Option>

    this.onSubmit(items)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.multiple-list {
  @extend .horizontal-list;
}
</style>
