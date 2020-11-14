<template>
  <Content class="option" :content="content" max="45" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Content from '@/components/Content.vue'

@Component({
  components: {
    Content
  }
})
export default class Option extends Vue {
  @Prop({ default: () => '' })
  private content!: string
}
</script>
