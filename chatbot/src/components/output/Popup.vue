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
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import CloseIcon from 'vue-material-design-icons/Close.vue'

@Component({
  components: {
    CloseIcon
  }
})
export default class Popup extends Vue {
  @Prop({ default: '' }) private title!: string;
  @Prop({ default: false }) private visible!: boolean;

  @Emit()
  private onClose () {
    return 0
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
  transition: opacity 0.3s ease;

  .wrapper {
    display: table-cell;
    vertical-align: middle;

    .holder {
      @extend .vertical-list;
      margin: 0px $marginMedium;
      padding: $marginMedium;
      background-color: $backgroundColor;
      border-radius: $borderRadius;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all $animationDuration;

      @include respond-to(medium) {
        width: 75%;
        margin: 0 auto;
      }

      @include respond-to(large) {
        width: 50%;
        margin: 0 auto;
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
