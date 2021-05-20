<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    <!--    store-->
    <h1>vuex</h1>
    <h2>{{ win }}</h2>
    <h2>{{ google }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  components: { HelloWorld },
  computed: {
    ...mapGetters({
      win: 'win',
    }),
  },
  setup() {
    return {
      google: 'tian',
    };
  },
});
</script>
