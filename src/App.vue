<template>
  <div class="flex w-screen h-screen bg-gray-300">
    <SideBar/>

    <main class="flex-1 p-6 overflow-y-auto">
      <router-view></router-view>
    </main>

    <HelpButton/>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import HelpButton from './components/HelpButton.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    HelpButton,
  },
};
</script>

<style>
</style>