<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">E-posta Doğrulama</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Lütfen e-posta adresinize gönderilen doğrulama kodunu girin.
        </p>
        <p v-if="email" class="mt-2 text-center text-sm text-gray-800 font-semibold">
          {{ email }}
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="verifyEmail">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="verificationCode" class="sr-only">Doğrulama Kodu</label>
            <input
                v-model="verificationCode"
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Doğrulama Kodu"
            />
          </div>
        </div>
        <div>
          <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>Doğrula</span>
          </button>
        </div>
        <p v-if="errorMessage" class="text-center text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <!-- Geri Sayım ve Yeniden Gönder Butonu -->
        <div class="text-center mt-4">
          <p v-if="countdown > 0" class="text-sm text-gray-600">
            {{ countdown }} saniye sonra yeniden gönderilebilir.
          </p>
          <button
              @click="resendCode"
              :disabled="resendDisabled || resendCount >= 3"
              class="mt-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            Yeniden Gönder
          </button>
          <p v-if="resendCount >= 3" class="text-sm text-red-600">
            Yeniden gönderim limiti doldu.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
  name: 'VerifyView',
  props: {
    email: {
      type: String,
      default: ''
    }
  },
  created() {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      this.fetchProtectedData();
    } else {
      console.log("No user found");
    }
  },
  setup(props) {
    const verificationCode = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();

    // Yeniden Gönderim için eklenen değişkenler
    const countdown = ref(180); // 3 dakika
    const resendDisabled = ref(true);
    const resendCount = ref(0);
    let countdownInterval;

    const verifyEmail = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        const response = await axios.post('http://localhost:3000/api/auth/verify', {
          email: props.email,
          code: verificationCode.value
        });

        if (response.data.success) {
          await router.push('/login');
        } else {
          errorMessage.value = response.data.message || 'Doğrulama başarısız!';
        }
      } catch (error) {
        console.error('Doğrulama hatası:', error);
        errorMessage.value = 'Doğrulama sırasında bir hata oluştu.';
      } finally {
        loading.value = false;
      }
    };

    const startCountdown = () => {
      countdown.value = 180; // 3 dakika
      resendDisabled.value = true;
      countdownInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          resendDisabled.value = false;
          clearInterval(countdownInterval);
        }
      }, 1000);
    };

    const resendCode = async () => {
      try {
        resendDisabled.value = true;
        resendCount.value++;
        const response = await axios.post('http://localhost:3000/api/auth/resend-code', {
          email: props.email
        });

        if (response.data.message) {
          startCountdown();
        }
      } catch (error) {
        console.error('Yeniden gönderim hatası:', error);
        errorMessage.value = 'Yeniden gönderim sırasında bir hata oluştu.';
      }
    };

    onMounted(() => {
      // Geçerli bir email yoksa logine yönlendir
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!props.email || !emailRegex.test(props.email)) {
        router.push('/login');
      }

      // Geri sayımı başlat
      startCountdown();
    });

    onBeforeUnmount(() => {
      clearInterval(countdownInterval);
    });

    return {
      verificationCode,
      loading,
      errorMessage,
      verifyEmail,
      countdown,
      resendDisabled,
      resendCount,
      resendCode
    };
  },
  methods: {
    async fetchProtectedData() {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error("❌ Kullanıcı yetkilendirilmemiş. Token bulunamadı.");
      }

      try {
        return await this.$axios.get('http://localhost:3000/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
          console.log("Otomotik oturum açılıyor...");
          window.location.href = "/cp";
        });
      } catch (error) {
        console.error("❌ Yetkilendirme hatası:", error.response ? error.response.data.message : error.message);
        throw error;
      }
    },
  }
};
</script>
<style scoped>
.loader {
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;
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
