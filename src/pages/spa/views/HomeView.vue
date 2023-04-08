<template>
  <div class="home">
    <el-button @click="$store.dispatch('increment')">{{ count }}</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/pages/spa/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  computed: {
    count() {
      return this.$store.state.count
    },
  },
}
</script>
