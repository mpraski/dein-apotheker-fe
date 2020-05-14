<template>
  <Bubble v-if="message.type === 'text'" :alignment="alignment" @on-delete="onDelete">
    <Content :content="message.content"/>
  </Bubble>
  <Photo
    v-else-if="message.type === 'image'"
    :alignment="alignment"
    :image="message.image"
    :padded="true">
    <Content :content="message.content"/>
  </Photo>
  <Photo
    v-else-if="message.type === 'buy'"
    :alignment="alignment"
    :image="message.image"
    :padded="true"
    :full="true">
    <Buy :name="message.name" :price="message.price"/>
  </Photo>
  <Bubble v-else>
    <Unknown />
  </Bubble>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import Bubble from '@/components/output/Bubble.vue'
import Content from '@/components/output/Content.vue'
import Photo from '@/components/output/Photo.vue'
import Buy from '@/components/output/Buy.vue'
import Unknown from '@/components/output/Unknown.vue'

import { Message, Alignment } from '@/store/message/types'

@Component({
  components: {
    Bubble,
    Content,
    Photo,
    Buy,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message;
  @Prop() private alignment!: Alignment;

  @Emit()
  private onDelete () { return 0 }
}
</script>
