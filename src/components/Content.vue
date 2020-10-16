<template>
  <p>{{ content }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Content extends Vue {
  @Prop({ default: '' }) private content!: string
}
</script>
