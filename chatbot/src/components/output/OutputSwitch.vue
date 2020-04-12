<template>
  <Bubble v-if="message.type === 'MESSAGE_TEXT'" :alignment="alignment">
    <Content :content="message.content" />
  </Bubble>
  <Photo
    v-else-if="message.type === 'MESSAGE_IMAGE'"
    :alignment="alignment"
    :image="message.image"
    :alt="message.alt"
  />
  <Unknown v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Bubble from '@/components/output/Bubble.vue'
import Content from '@/components/output/Content.vue'
import Photo from '@/components/output/Photo.vue'
import Unknown from '@/components/output/Unknown.vue'

import { Message, Alignment } from '@/store/message/types'

@Component({
  components: {
    Bubble,
    Content,
    Photo,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message;
  @Prop() private alignment!: Alignment;
}
</script>
