<template>
  <div class="logo-body">
    <img class="logo" src="@/assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Logo extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.logo-body {
  @include horizontal-list;
  @include responsive-text;

  align-items: center;
  user-select: none;

  .logo {
    width: $buttonSize;
    height: $buttonSize;
    margin-right: $marginMedium;
  }

  .text {
    display: none;
  }

  @include respond-to(medium) {
    .text {
      display: inline-block;
    }
  }
}
</style>
