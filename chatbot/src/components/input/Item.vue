<template>
  <VueMarkdown v-once :source="option.content" @click.native="onSelect" class="item-body"></VueMarkdown>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

import { Option } from '@/domain/question'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Item extends Vue {
  @Prop() private option!: Option;

  @Emit()
  private onSelect (): Option {
    return this.option
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-body {
  @extend .bubble;
  @include actionable;

  margin-left: $marginSmall;
  margin-bottom: $marginSmall;
}
</style>
