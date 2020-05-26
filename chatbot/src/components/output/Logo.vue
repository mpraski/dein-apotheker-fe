<template>
  <div class="logo-body">
    <img class="logo" src="@/assets/logo.png" />Dein Apotheker
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Logo extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.logo-body {
  @extend .horizontal-list;
  align-items: center;

  .logo {
    width: $buttonSize;
    height: $buttonSize;

    margin-right: $marginMedium;
  }
}
</style>