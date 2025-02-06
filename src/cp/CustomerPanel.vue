<template>
  <div class="flex w-screen h-screen bg-gray-300">
    <!-- Loading ekranı -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900" style="z-index: 999999 !important;">
      <div class="flex items-center space-x-2">
        <span class="material-icons text-white text-4xl animate-spin">autorenew</span>
        <span class="text-white font-semibold">Yükleniyor...</span>
      </div>
    </div>

    <SideBar/>

    <main class="flex-1 p-6 overflow-y-auto">
      <router-view name="cp"></router-view>
    </main>

    <HelpButton/>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import HelpButton from '../components/HelpButton.vue';

export default {
  name: 'CustomerPanel',
  data() {
    return {
      loading: true,
    };
  },
  created() {
    fetch('http://localhost:3000/api/protected', { credentials: 'include' })
        .then(res => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then(data => {
          console.log("Authenticated User:", data.user);
          this.loading = false;
        })
        .catch(() => {
          this.$router.push('/login');
        });
  },
  components: {
    SideBar,
    HelpButton,
  },
};
</script>

<style scoped>
.material-icons {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
