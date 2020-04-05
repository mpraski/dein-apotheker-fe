<template>
  <VueMarkdown v-once :source="content" class="item-body"></VueMarkdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Item extends Vue {
  @Prop() private content!: string;
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
