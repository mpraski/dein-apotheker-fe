<template>
  <div
    class="item-selectible-body"
    v-bind:class="{ selected: this.selected }"
    @click="onSelect"
  >
    <keep-alive>
      <component v-bind:is="getIcon" class="icon"></component>
    </keep-alive>
    <VueMarkdown v-once :source="option.content"></VueMarkdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import VueMarkdown from 'vue-markdown'

import { ID, Option } from '@/domain/question'

@Component({
  components: {
    VueMarkdown,
    CheckIcon,
    CloseIcon
  }
})
export default class ItemSelectible extends Vue {
  @Prop() private option!: Option;

  @Prop({ default: false })
  private selected!: boolean;

  @Emit()
  private onSelect (): ID {
    return this.option.id
  }

  get getIcon () {
    return this.selected ? CloseIcon : CheckIcon
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-selectible-body {
  @extend .bubble;

  @include actionable;
  @include selectable;

  display: flex;

  margin-left: $marginSmall;
  margin-bottom: $marginSmall;

  .icon {
    margin-right: $marginSmall;
  }
}
</style>
