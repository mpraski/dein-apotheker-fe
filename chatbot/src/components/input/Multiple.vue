<template>
  <div>
    <div class="multiple-list">
      <ItemSelectible v-once content="Yes"></ItemSelectible>
      <ItemSelectible v-once content="No"></ItemSelectible>
      <ItemSelectible v-once content="Maybe" selected="true"></ItemSelectible>
    </div>
    <div class="multiple-button">
      <span>Proceed</span>
      <CloseIcon class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ItemSelectible from '@/components/input/ItemSelectible.vue'
import CloseIcon from 'vue-material-design-icons/ChevronRight.vue'

@Component({
  components: {
    ItemSelectible,
    CloseIcon
  }
})
export default class Multiple extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.multiple-list {
  @extend .horizontal-list;
}

.multiple-button {
  @extend .bubble;
  @include actionable;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  margin-left: 4rem;
  margin-right: 4rem;

  .icon {
    height: 1.25em;
    width: 1.25em;
  }

  .icon > .material-design-icon__svg {
    height: 1.25em;
    width: 1.25em;
    bottom: 0;
  }
}
</style>
