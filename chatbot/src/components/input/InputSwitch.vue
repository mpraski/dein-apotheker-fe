<template>
  <FadeIn>
    <Single v-if="visible && input.type === 'INPUT_SINGLE'" :options="input.options" />
    <Multiple v-else-if="visible && input.type === 'INPUT_MULTIPLE'" :options="input.options" />
    <Prompt v-else-if="visible && input.type === 'INPUT_PROMPT'" />
  </FadeIn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import FadeIn from '@/components/transition/FadeIn.vue'

import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'

import { Input } from '@/domain/input'

@Component({
  components: {
    FadeIn,
    Single,
    Multiple,
    Prompt
  }
})
export default class InputSwitch extends Vue {
  @Prop() private input!: Input;

  @Prop({ default: true }) private visible!: boolean;
}
</script>
