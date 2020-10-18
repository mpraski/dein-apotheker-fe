<template>
  <div class="bubble">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class SelectibleItem extends Vue {
  @Prop({ default: () => false })
  private selected!: boolean
}
</script>
