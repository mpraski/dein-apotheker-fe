<template>
  <div class="item-selectible-body" :class="{ selected: this.selected }">
    <keep-alive>
      <FadeIn>
        <component :is="getIcon" class="icon"></component>
      </FadeIn>
    </keep-alive>
    <VueMarkdown v-once :source="content" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import VueMarkdown from 'vue-markdown'

import FadeIn from '@/components/transition/FadeIn.vue'

@Component({
  components: {
    VueMarkdown,
    CheckIcon,
    CloseIcon,
    FadeIn
  }
})
export default class ItemSelectible extends Vue {
  @Prop({ default: '' })
  private content!: string;

  @Prop({ default: false })
  private selected!: boolean;

  private get getIcon () {
    return this.selected ? CloseIcon : CheckIcon
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.item-selectible-body {
  @include bubble;
  @include actionable;
  @include selectable;
  @include horizontal-list(center);
  @include padded($paddingSymptomSmall, $paddingSymptom);

  .icon {
    margin-right: $marginSmall;
  }
}
</style>
