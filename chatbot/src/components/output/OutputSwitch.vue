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
  <Product
    v-else-if="message.type === 'product'"
    :name="message.name"
    :image="message.image"
    @on-buy="add"
    @on-info="showPopup(['product', message])"
  />
  <Bubble v-else>
    <Unknown />
  </Bubble>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

import { popupNamespace } from "@/store/popup";
import { cartNamespace } from "@/store/cart";

import { Actions as PopupActions, PopupKey } from "@/store/popup/types";
import { Actions as CartActions, Product as Item } from "@/store/cart/types";

import Bubble from "@/components/output/Bubble.vue";
import Content from "@/components/output/Content.vue";
import Photo from "@/components/output/Photo.vue";
import Product from "@/components/output/Product.vue";
import Unknown from "@/components/output/Unknown.vue";

import { Message, Alignment } from "@/store/message/types";

@Component({
  components: {
    Bubble,
    Content,
    Photo,
    Product,
    Unknown
  }
})
export default class OutputSwitch extends Vue {
  @Prop() private message!: Message;
  @Prop() private alignment!: Alignment;

  @Action(PopupActions.showPopup, { namespace: popupNamespace })
  private showPopup!: (a: [PopupKey, any]) => void;

  @Action(CartActions.add, { namespace: cartNamespace })
  private addToCart!: (a: Item) => void;

  @Emit()
  private onDelete() {
    return 0;
  }

  private add() {
    const m = this.message;

    if (m.type === "product") {
      this.addToCart({
        id: m.name,
        name: m.name
      });
    }
  }
}
</script>
