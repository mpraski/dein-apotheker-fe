<template>
  <Single v-if="input.type === 'INPUT_SINGLE'" :options="input.options" />
  <Multiple v-else-if=" input.type === 'INPUT_MULTIPLE'" :options="input.options" />
  <Prompt v-else-if="input.type === 'INPUT_PROMPT'" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import Single from '@/components/input/Single.vue'
import Multiple from '@/components/input/Multiple.vue'
import Prompt from '@/components/input/Prompt.vue'

import { Input } from '@/store/input/types'

@Component({
  components: {
    Single,
    Multiple,
    Prompt
  }
})
export default class InputSwitch extends Vue {
  @Prop() private input!: Input;
}
</script>
