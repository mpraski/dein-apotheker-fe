<template>
  <ul class="language-list">
    <li
      class="language"
      v-for="l in languages"
      :key="l"
      v-bind:class="{ selected: selected === l }"
      @click="onSelect(l)"
    >{{l}}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({})
export default class LanguageSwitch extends Vue {
  @Prop() private languages!: ReadonlyArray<string>;

  @Prop() private selected!: string;

  @Emit()
  private onSelect (s: string) {
    return s
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.language-list {
  .language {
    &.selected {
      color: red;
    }
  }
}
</style>
