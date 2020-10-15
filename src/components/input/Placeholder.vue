<template>
  <div class="placeholder-body">
    {{ text }}
    <EmoticonOutline class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import EmoticonOutline from 'vue-material-design-icons/EmoticonOutline.vue'

@Component({
  components: {
    EmoticonOutline,
  },
})
export default class Placeholder extends Vue {
  @Prop({ default: '' })
  private text!: string
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.placeholder-body {
  @include padded;
  @include centered;
  @include horizontal-list(center);
  @include bubble(transparent, transparent, transparent, transparent);

  border: 0;
  color: $textColorSecondary;
  margin-bottom: $marginSmall;

  .icon {
    margin-left: $marginSmall;
  }
}
</style>
