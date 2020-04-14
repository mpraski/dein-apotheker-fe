<template>
  <div class="prompt-body">
    <input
      v-model="content"
      v-on:keyup.enter="onSend"
      type="text"
      placeholder="Your answer"
      class="input"
    />
    <div v-on:click="onSend" v-bind:class="{ disabled: isDisabled }" class="send">
      <SendIcon class="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SendIcon from 'vue-material-design-icons/Send.vue'

@Component({
  components: {
    SendIcon
  }
})
export default class Prompt extends Vue {
  @Prop({ default: '' })
  private content!: string;

  @Prop({ default: () => () => 0 })
  private onSubmit!: (c: string) => void;

  private get isDisabled (): boolean {
    return this.content === ''
  }

  private onSend () {
    if (this.content) {
      this.onSubmit(this.content)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.prompt-body {
  @extend .bubble;
  @include centered;

  display: flex;
  flex-direction: row;
  justify-content: center;

  .input {
    flex-grow: 1;
  }

  .send {
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: $marginSmall;
    background-color: $accentColor;

    border-radius: 2rem;

    transition: $animationDuration;
    cursor: pointer;

    &:hover {
      background-color: lighten($accentColor, 5%);
      border-color: lighten($accentColor, 5%);
    }

    &:active {
      background-color: lighten($accentColor, 10%);
      border-color: lighten($accentColor, 10%);
    }

    &.disabled {
      background-color: $buttonBorderColor;
      color: $textColorSecondary;
      cursor: not-allowed;

      &:hover {
        background-color: $buttonBorderColor;
      }

      &:active {
        border-color: $buttonBorderColor;
        background-color: $buttonBorderColor;
      }
    }
  }
}
</style>
