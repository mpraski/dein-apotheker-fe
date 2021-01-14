<template>
  <VueMarkdown class="content">{{ content }}</VueMarkdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Markdown extends Vue {
  @Prop({ default: () => '' })
  private readonly content!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.content {
  @include responsive-text;

  * > {
    @include responsive-text;
  }
}
</style>
