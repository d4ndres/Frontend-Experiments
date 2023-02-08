<template>
  <div>
    <AppHeader/>
    <Transition>
      <router-view/>
    </Transition>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  name: "App",
  components: {
    AppHeader
  },
  mounted() {
    this.$store.dispatch('setUsers')
  }
}

</script>

<style>
@import url('@/assets/master.css');



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
