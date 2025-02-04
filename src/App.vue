<template>
  <div class="flex w-screen h-screen bg-gray-300">
    <SideBar />

  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar,
  },
};
</script>

<style>
</style>