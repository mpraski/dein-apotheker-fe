<template>
  <div class="selectible">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class SelectibleItem extends Vue {
  @Prop({ default: () => false })
  private readonly selected!: boolean
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.selectible {
  @extend .bubble;
  @include actionable;
}
</style>
