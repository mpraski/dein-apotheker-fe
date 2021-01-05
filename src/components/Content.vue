<template>
  <p class="content">{{ content }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Content extends Vue {
  @Prop({ default: () => '' })
  private content!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.content {
  @include responsive-text;
}
</style>
