<template>
  <p class="placeholder">{{ text }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Placeholder extends Vue {
  @Prop({ default: () => '' })
  private text!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.placeholder {
  @include horizontal-list(center);

  color: $textColorSecondary;
  user-select: none;
}
</style>
