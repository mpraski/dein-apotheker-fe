<template>
  <Bubble v-if="message.type === 'text'" :alignment="alignment" @on-delete="onDelete">
    <Content :content="message.content" />
  </Bubble>
  <Photo
    v-else-if="message.type === 'image'"
    :alignment="alignment"
    :image="message.image"
    :padded="true"
  >
    <Content :content="message.content" />
  </Photo>
  <Photo
    v-else-if="message.type === 'product'"
    :alignment="alignment"
    :image="message.image"
    :padded="true"
    :full="true"
  >
    <Product :name="message.name" @on-info="infoVisible = true" />
    <Popup :visible="infoVisible" :title="message.name" @on-close="infoVisible = false">
      <ProductInfo :directions="message.directions" :explanation="message.explanation" />
    </Popup>
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
import Product from '@/components/output/Product.vue'
import ProductInfo from '@/components/output/ProductInfo.vue'
import Unknown from '@/components/output/Unknown.vue'
import Popup from '@/components/output/Popup.vue'

import { Message, Alignment } from '@/store/message/types'

@Component({
  components: {
    Bubble,
    Content,
    Photo,
    Product,
    ProductInfo,
    Unknown,
    Popup
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message;
  @Prop() private alignment!: Alignment;

  private infoVisible = false;

  @Emit()
  private onDelete () {
    return 0
  }
}
</script>
