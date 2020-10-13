<template>
  <VueMarkdown v-once :source="content" class="item-body right" />
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
  @Prop({ default: '' })
  private content!: string;
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-body {
  @include bubble;
  @include actionable;
  @include padded($paddingSymptomSmall, $paddingSymptom);

  max-width: 100% !important;
}
</style>
