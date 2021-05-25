<template>

  <div>Home </div>

<!--  <a-button type="primary">Primary</a-button>-->

  <Button type="primary">Primary </Button>

</template>

<script lang="ts">

import {Button } from "ant-design-vue"

import {defineComponent} from 'vue';

export default defineComponent({
  name: "Home",
  components :{
    Button
  }
})

</script>

<style scoped>

</style>
