<template>
  <div class="popup-mask">
    <div class="holder">
      <div class="header">
        <h2 class="title">{{ title }}</h2>
        <CloseIcon class="icon" @click="onClose" />
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/Close.vue'

@Component({
  components: {
    CloseIcon
  }
})
export default class Popup extends Vue {
  @Prop({ default: () => '' })
  private readonly title!: string

  @Emit()
  private onClose() {
    return 0
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $backgroundColor;

  .holder {
    @include vertical-list;

    padding: $marginMedium;
    margin-left: auto;
    margin-right: auto;

    @include respond-to(small) {
      max-width: $chatWidth;
    }

    .header {
      @include horizontal-list;

      justify-content: space-between;
      margin-bottom: $marginMedium;

      .title {
        @include responsive-text;
        margin: 0;
        padding: 0;
      }

      .icon {
        @include big-icon;
      }
    }

    .body {
      flex: 1;
    }
  }
}
</style>
