<template>
  <div class="placeholder-body" :class="placeholderClass">
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

  @Prop({ default: false })
  private padded!: boolean;

  private get placeholderClass (): object {
    return {
      padded: this.padded
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.placeholder-body {
  @include bubble;
  @include centered;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 0;
  color: $textColorSecondary;
  background-color: transparent;

  margin-bottom: $marginSmall;

  .icon {
    margin-left: $marginSmall;
  }

  &.padded {
    padding: 2.5rem 0;
  }
}
</style>
