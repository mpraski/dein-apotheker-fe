<template>
  <VueMarkdown v-once :source="content" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Content extends Vue {
  @Prop({ default: '' }) private content!: string;
}
</script>
