<template>
  <div class="flex w-screen h-screen bg-gray-400">
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black"
         style="z-index: 999999 !important;">

      <div class="flex flex-col items-center justify-center text-center">
        <div class="flex items-center space-x-2">
          <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg"
               style="width: 50px; color:white; height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024">
            <path
                d="M800 329.984q54.016 82.005333 54.016 182.016 0 139.989333-100.992 240.981333t-240.981333 100.992l0 128-169.984-171.989333 169.984-169.984 0 128q105.984 0 180.992-75.008t75.008-180.992q0-59.989333-29.994667-120.021333zM512 256q-105.984 0-180.992 75.008t-75.008 180.992q0 66.005333 29.994667 120.021333l-61.994667 61.994667q-54.016-82.005333-54.016-182.016 0-139.989333 100.992-240.981333t240.981333-100.992l0-128 169.984 171.989333-169.984 169.984 0-128z"/>
          </svg>
          <span class="text-white font-semibold text-2xl">Tafly Yükleniyor...</span>
        </div>

        <span class="text-white font-semibold text-sm mt-2">v1.0.0</span>
      </div>
    </div>

    <SideBar v-if="verify"/>
    <main class="flex-1 p-6 overflow-y-auto" v-if="verify">
      <router-view name="cp"></router-view>
    </main>

    <main v-if="!verify" class="flex-1 flex items-center justify-center">
      <SetupView/>
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
      verify: false,
      loading: true,
    };
  },
  components: {
    SetupView,
    SideBar,
    HelpButton,
  },
  async created() {
    await this.checkAuth();
    this.$axios.get(`http://localhost:3000/api/auth/setup/${JSON.parse(localStorage.getItem("userInfo"))?._id}`)
        .then((response) => {
          this.verify = response.data.setup;
        }).catch((error) => {
      console.log(error);
    })
    this.$axios.get(`http://localhost:3000/api/business/get?ownerId=${JSON.parse(localStorage.getItem('userInfo'))?._id}`)
        .then(response => {
          localStorage.setItem("businessInfo", JSON.stringify(response.data.business));
        }).catch(error => {
      console.log(error);
    });

  },
  methods: {
    async checkAuth() {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          localStorage.removeItem('auth-token');
          window.location.href = '/login';
          new Error("❌ Kullanıcı oturum açmamış.");
        }

        const response = await this.$axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          this.verify = true;
        } else {
          new Error("❌ Token geçersiz.");
        }
      } catch (error) {
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      } finally {
        this.loading = false;
      }
    }
  }
}

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
