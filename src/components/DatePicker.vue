<template>
  <div class="date-picker">
    <Datepicker
      @keyup.enter="onSend"
      v-model="content"
      name="somedate"
      class="field"
    />
    <SendIcon @click="onSend" class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import Datepicker from 'vuejs-datepicker'
import SendIcon from 'vue-material-design-icons/Send.vue'

@Component({
  components: {
    Datepicker,
    SendIcon
  }
})
export default class DatePicker extends Vue {
  private readonly content!: Date

  constructor() {
    super()

    this.content = new Date()
  }

  private onSend() {
    this.onSubmit(this.content.toISOString())
  }

  @Emit()
  private onSubmit(c: string): string {
    return c
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.date-picker {
  @extend .padded;
  @include horizontal-list(flex-start, nowrap);
  @include bordered($borderRadiusHuge, solid, $borderWidthAction, $textColor);

  .icon {
    @include big-icon;
  }

  .field {
    flex-grow: 1;

    * > {
      @include responsive-text;
    }
  }
}
</style>
