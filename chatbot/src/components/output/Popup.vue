<template>
  <div class="popup-mask" v-if="visible">
    <div class="wrapper">
      <div class="holder">
        <div class="header">
          <h2 class="title">{{title}}</h2>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import CloseIcon from "vue-material-design-icons/Close.vue";

@Component({
  components: {
    CloseIcon
  }
})
export default class Popup extends Vue {
  @Prop({ default: "" }) private title!: string;
  @Prop({ default: false }) private visible!: boolean;

  @Emit()
  private onClose() {
    return 0;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity $animationDuration;

  .wrapper {
    display: table-cell;
    vertical-align: bottom;

    @include respond-to(medium) {
      display: block;
    }

    .holder {
      @extend .vertical-list;
      margin: 0 auto;
      padding: $marginMedium;
      background-color: $backgroundColor;
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all $animationDuration;
      min-height: 60vh;
      bottom: 0;

      @include respond-to(medium) {
        width: 75%;
        margin-top: 25vh;
        border-bottom-left-radius: $borderRadius;
        border-bottom-right-radius: $borderRadius;
        min-height: auto;
      }

      @include respond-to(large) {
        width: 50%;
      }

      .header {
        @extend .horizontal-list;

        justify-content: space-between;
        margin-bottom: $marginRegular;

        .title {
          margin: 0;
          padding: 0;
          font-size: $textSizeLarge;
          font-weight: normal;
        }

        .icon {
          @include big-icon;
        }
      }
    }
  }
}
</style>
