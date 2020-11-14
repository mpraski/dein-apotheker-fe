<template>
  <p class="content">{{ text }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Content extends Vue {
  @Prop({ default: () => '' })
  private content!: string

  @Prop({ default: () => 256 })
  private max!: number

  private get text(): string {
    return this.content.length <= this.max
      ? this.content
      : this.content.substring(0, this.max) + '...'
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.content {
  @extend .padded;
}
</style>
