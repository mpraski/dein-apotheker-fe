<template>
  <div class="answer-list">
    <Answer v-once content="Yes"></Answer>
    <Answer v-once content="No"></Answer>
    <Answer v-once content="Maybe"></Answer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Answer from '@/components/Answer.vue'

@Component({
  components: {
    Answer
  }
})
export default class Prompt extends Vue {
}
</script>

<style scoped lang="scss">
.answer-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  min-width: 50%;
}
</style>
