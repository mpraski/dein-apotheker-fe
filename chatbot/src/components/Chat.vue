<template>
  <div>
    <div class="output-container" ref="chatContainer">
      <FadeIn group="true" delay="true" class="output-list">
        <OutputSwitch v-for="(message, index) in messages" v-bind:key="index" :message="message" />
      </FadeIn>
    </div>
    <div class="input-container">
      <FadeIn class="input-list">
        <InputSwitch :input="input" v-if="inputVisible"/>
      </FadeIn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import FadeIn from '@/components/transition/FadeIn.vue'
import OutputSwitch from '@/components/output/OutputSwitch.vue'
import InputSwitch from '@/components/input/InputSwitch.vue'

import { Message } from '@/domain/message'
import { Input } from '@/domain/input'

@Component({
  components: {
    FadeIn,
    OutputSwitch,
    InputSwitch
  }
})
export default class Chat extends Vue {
  @Prop({ default: () => [] })
  private messages!: Array<Message>;

  private messagesToAdd!: Array<Message>;

  private input!: Input;

  private inputVisible!: boolean;

  $refs!: {
    chatContainer: HTMLElement;
  };

  constructor () {
    super()
    this.inputVisible = false
    this.messagesToAdd = [
      {
        type: 'MESSAGE_TEXT',
        content: 'For which **symptom** are you looking for a drug?',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Running nose',
        alignment: 'RIGHT'
      },
      {
        type: 'MESSAGE_TEXT',
        content:
          "Soon we'll be able to help you also in situation like that. Right now we are sorry. We deal with one of your most important values - your health. We know that and therefore it is important to know our limits. Please ask your practitioner or pharmacist for help.",
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Understood',
        alignment: 'RIGHT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_TEXT',
        content: 'Some other question',
        alignment: 'LEFT'
      },
      {
        type: 'MESSAGE_IMAGE',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        alt: 'Have a cat picture',
        alignment: 'LEFT'
      }
    ]

    this.input = {
      type: 'INPUT_MULTIPLE',
      options: [
        {
          id: 'running_nose',
          content: 'Running nose'
        },
        {
          id: 'fever',
          content: 'Fever'
        },
        {
          id: 'headache',
          content: 'Headache'
        },
        {
          id: 'dry_cough',
          content: 'Dry cough'
        }
      ]
    }
  }

  private mounted () {
    setInterval(this.addMessage, 1000)
  }

  private updated () {
    this.$nextTick(this.scrollToEnd)
  }

  private scrollToEnd () {
    this.$refs.chatContainer.scrollBy({
      top: 1000,
      behavior: 'smooth'
    })
  }

  private addMessage () {
    if (this.messagesToAdd.length > 0) {
      const item = this.messagesToAdd.shift()
      if (item) {
        this.messages.push(item)
      }
    } else {
      this.inputVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/app.scss";

.output-container {
  height: 67vh;
  overflow-y: hidden;
}

.output-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;

  padding: 0 .5rem;
}

.input-container {
  height: 33vh;
}

.input-list {
  @extend .vertical-list;
  max-width: $chatWidth;

  margin-left: auto;
  margin-right: auto;

  padding: 0 .5rem;
}
</style>
