<template>
  <p class="option">{{ content }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Option extends Vue {
  @Prop({ default: () => '' })
  private content!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';
</style>
