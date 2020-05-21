<template>
  <div class="placeholder-body">
    {{text}}
    <EmoticonOutline class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import EmoticonOutline from 'vue-material-design-icons/EmoticonOutline.vue'

@Component({
  components: {
    EmoticonOutline
  }
})
export default class Placeholder extends Vue {
  @Prop({ default: '' })
  private text!: string;
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.placeholder-body {
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
