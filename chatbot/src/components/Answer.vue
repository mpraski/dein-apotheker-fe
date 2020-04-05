<template>
  <VueMarkdown v-once :source="content" class="answer-body"></VueMarkdown>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Answer extends Vue {
  @Prop() private content!: string;
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.answer-body {
  @extend .bubble;

  display: inline-flex;

  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
