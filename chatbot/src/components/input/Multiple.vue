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
      class="proceed"
      icon="arrow"
      :content="$t('general.proceed')"
      :enabled="hasItems"
      :on-select="onProceed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import ItemSelectible from '@/components/input/item/ItemSelectible.vue'
import Action from '@/components/input/Action.vue'

import { Option } from '@/store/input/types'

@Component({
  components: {
    ItemSelectible,
    Action
  }
})
export default class Multiple extends Vue {
  @Prop({ default: () => [] })
  private options!: ReadonlyArray<Option>;

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
    ) as Array<Option>

    this.onSubmit(items)
  }

  @Emit()
  private onSubmit (a: Array<Option>): Array<Option> {
    return a
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.multiple-list {
  @include horizontal-list;

  & > div {
    flex: 1 1 33%;
    margin-bottom: $marginSmall;

    &:nth-child(even) {
      margin-left: $marginSmall / 2;
    }

    &:nth-child(odd) {
      margin-right: $marginSmall / 2;
    }
  }
}

.proceed {
  margin-top: $marginSmall;
}
</style>
