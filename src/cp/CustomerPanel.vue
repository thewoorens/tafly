<template>
  <div class="flex w-screen h-screen bg-gray-300">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900"
         style="z-index: 999999 !important;">
      <div class="flex items-center space-x-2">
        <span class="material-icons text-white text-4xl animate-spin">autorenew</span>
        <span class="text-white font-semibold">Yükleniyor...</span>
      </div>
    </div>

    <SideBar v-if="verify"/>

    <main class="flex-1 p-6 overflow-y-auto" v-if="verify">
      <router-view name="cp"></router-view>
    </main>

    <main v-if="!verify" class="flex-1 flex items-center justify-center">
      <SetupView />
    </main>

    <HelpButton v-if="verify"/>
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
import HelpButton from '../components/HelpButton.vue';
import SetupView from "@/cp/views/SetupView.vue";

export default {
  name: 'CustomerPanel',
  data() {
    return {
      verify: false, // Başlangıçta false olarak ayarla
      loading: true, // Yükleme durumu
    };
  },
  async created() {
    try {
      // Kullanıcının yetkilendirme bilgilerini kontrol et
      const authResponse = await fetch('http://localhost:3000/api/protected', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!authResponse.ok) {
        throw new Error('Unauthorized');
      }


      // İşletme bilgilerini çek
      const businessResponse = await fetch(`http://localhost:3000/api/get/user/?userId=${JSON.parse(localStorage.getItem("userInfo"))?.id}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!businessResponse.ok) {
        throw new Error('Failed to fetch business info');
      }

      const businessData = await businessResponse.json();
      localStorage.setItem('businessInfo', JSON.stringify(businessData[0]));
      this.verify =  businessData[0].setup_status || false;

      this.loading = false;
    } catch (error) {
      console.error("❌ Error:", error);
      window.location.href = '/login';
    }
  },
  components: {
    SetupView,
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>