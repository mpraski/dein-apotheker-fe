<template>
  <div class="prompt">
    <input
      ref="input"
      v-model="content"
      @keyup.enter="onSend"
      type="text"
      class="input"
    />
    <SendIcon @click="onSend" class="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import SendIcon from 'vue-material-design-icons/Send.vue'

@Component({
  components: {
    SendIcon
  }
})
export default class Prompt extends Vue {
  private readonly content!: string

  // prettier-ignore
  $refs!: {
    input: HTMLInputElement;
  }

  constructor() {
    super()

    this.content = ''
  }

  private mounted() {
    this.$refs.input.focus()
  }

  private onSend() {
    this.onSubmit(this.content)
  }

  @Emit()
  private onSubmit(c: string): string {
    return c
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.prompt {
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
