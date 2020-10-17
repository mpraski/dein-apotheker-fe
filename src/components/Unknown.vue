<template>
  <b class="unknown">{{ $t('message.unknown') }}</b>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Unknown extends Vue {}
</script>

<style scoped lang="scss">
@import '@/assets/app.scss';

.unknown {
  @include padded;
}
</style>
