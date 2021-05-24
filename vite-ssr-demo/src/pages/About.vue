<template>

  <h1>{{ msg }}</h1>
  <h3>{{ hello }} </h3>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {mapGetters} from "vuex";

export default defineComponent({
  name: "About",
  computed: {
    ...mapGetters({
      hello : 'hello'
    })

  },
  setup() {
    return {
      msg: 'About'

    }
  }
})

</script>

<style scoped>

</style>
