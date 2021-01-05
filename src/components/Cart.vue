<template>
  <div class="cart">
    <ListItem
      v-for="item in cart"
      :key="item.id"
      v-bind="item"
      height="7"
      width="7"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ListItem from '@/components/ListItem.vue'

@Component({
  components: {
    ListItem
  }
})
export default class Cart extends Vue {
  @Prop({ default: () => [] })
  private readonly cart!: Cart
}
</script>
