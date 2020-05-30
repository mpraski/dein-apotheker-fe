<template>
  <div class="action-body" :class="{ disabled: !enabled }" @click="onSelect">
    <p>{{content}}</p>
    <keep-alive v-if="icon">
      <component :is="iconComp" class="icon"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/ArrowRight.vue'
import Item from '@/components/input/item/Item.vue'

@Component({
  components: {
    Item,
    CloseIcon
  }
})
export default class Action extends Vue {
  @Prop({ default: undefined })
  private icon?: 'arrow';

  @Prop({ default: '' })
  private content!: string;

  @Prop({ default: true })
  private enabled!: boolean;

  @Prop()
  private onSelect!: () => void;

  private static readonly iconMapping = {
    arrow: CloseIcon
  };

  private get iconComp () {
    if (this.icon) {
      return Action.iconMapping[this.icon]
    }
    return null
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.action-body {
  @include bubble;
  @include actionable;
  @include centered;
  @extend .horizontal-list;

  justify-content: center;
  align-items: center;

  margin-bottom: $marginSmall;

  .icon {
    margin-left: $marginSmall;
  }
}
</style>
