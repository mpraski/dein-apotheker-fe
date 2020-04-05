<template>
  <div class="home">
    <ChatBot msg="Martin"></ChatBot>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatBot from '@/components/ChatBot.vue'

export default {
  name: 'Home',
  components: {
    ChatBot
  }
}
</script>
