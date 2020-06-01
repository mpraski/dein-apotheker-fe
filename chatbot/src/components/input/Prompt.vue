<template>
  <div class="prompt-body">
    <input
      v-model="content"
      @keyup.enter="onSend"
      :placeholder="$t('message.yourAnswer')"
      type="text"
      class="input"
    />
    <div @click="onSend" :class="{ disabled: isDisabled }" class="send">
      <SendIcon class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import SendIcon from 'vue-material-design-icons/Send.vue'

@Component({
  components: {
    SendIcon
  }
})
export default class Prompt extends Vue {
  @Prop({ default: '' })
  private content!: string;

  private get isDisabled (): boolean {
    return this.content === ''
  }

  private onSend () {
    if (this.content) {
      this.onSubmit(this.content)
    }
  }

  @Emit()
  private onSubmit (c: string): string {
    return c
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.prompt-body {
  @include bubble;
  @include centered;

  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: $marginSmall;

  .input {
    flex-grow: 1;
  }

  .send {
    @include actionable($accentColor, $buttonBorderColor);

    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: $marginSmall;
    background-color: $accentColor;
    border-radius: $borderRound;
  }
}
</style>
