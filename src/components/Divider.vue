<template>
  <div class="divider"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Divider extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.divider {
  margin-bottom: $marginRegular;
  border-top: 3px solid $borderColor;
}
</style>
