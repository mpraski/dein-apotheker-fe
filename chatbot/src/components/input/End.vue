<template>
  <div class="end-body">
    Thank you for the chat
    <EmoticonOutline class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import EmoticonOutline from 'vue-material-design-icons/EmoticonOutline.vue'

@Component({
  components: {
    EmoticonOutline
  }
})
export default class End extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.end-body {
  @extend .bubble;
  @include centered;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 0;
  color: $textColorSecondary;

  .icon {
    margin-left: $marginSmall;
  }
}
</style>
