<template>
  <div class="single-list">
    <Item v-once content="Yes" />
    <Item v-once content="No" />
    <Item v-once content="Maybe" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Item from '@/components/answer/Item.vue'

@Component({
  components: {
    Item
  }
})
export default class Single extends Vue {
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.single-list {
  @extend .horizontal-list;
}
</style>
