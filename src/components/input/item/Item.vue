<template>
  <p class="item-body right">{{ content }}</p>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Item extends Vue {
  @Prop({ default: '' })
  private content!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.item-body {
  @include bubble;
  @include padded($paddingSymptomSmall, $paddingSymptom);

  max-width: 100% !important;
}
</style>
