<template>
  <div class="item-selectible-body" v-bind:class="{ selected: this.selected }">
    <keep-alive>
        <component v-bind:is="getIcon" class="icon"></component>
    </keep-alive>
    <VueMarkdown v-once :source="content"></VueMarkdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown,
    CheckIcon,
    CloseIcon
  }
})
export default class ItemSelectible extends Vue {
  @Prop()
  private content!: string;

  @Prop({ default: false })
  private selected!: boolean;

  get getIcon () {
    return this.selected ? CloseIcon : CheckIcon
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-selectible-body {
  @extend .bubble;

  @include actionable;
  @include selectable;

  display: -webkit-box;

  margin-left: 0.5rem;
  margin-bottom: 0.5rem;

  .icon {
    margin-right: 0.5rem;
  }
}
</style>
