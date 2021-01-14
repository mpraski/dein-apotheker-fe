<template>
  <div class="message">
    <Content class="text" :content="message.text" />
    <Content
      class="hint"
      v-if="message.popup"
      :content="message.popup.hint"
      @click.native="onPopup"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

import Content from '@/components/Content.vue'

import { Message as MessageT, Popup } from '@/store/chat/types'
import { VueConstructor } from 'vue'

@Component({
  components: {
    Content
  }
})
export default class Message extends Vue {
  @Prop() private message!: MessageT

  @Emit()
  private onPopup(): Popup {
    if (this.message.popup) {
      return this.message.popup
    }

    throw new Error('popup is null!')
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.message {
  width: 75%;

  margin-top: $marginMedium;
  margin-bottom: $marginLarge;

  .text {
    @include hero;
  }

  .hint {
    cursor: pointer;
    color: $textColorSecondary;
    margin-top: $marginMedium;
  }
}
</style>
