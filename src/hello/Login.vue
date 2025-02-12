<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="email">E-posta</label>
          <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2" for="password">Şifre</label>
          <input
              v-model="password"
              type="password"
              id="password"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Giriş Yap
        </button>
      </form>
      <div class="mt-4 text-center">
        <router-link to="/register" class="text-blue-500 hover:underline">Hesabınız yok mu? Kayıt Olun</router-link>
      </div>
      <div v-if="error" class="mt-4 text-center text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false, // Yükleme durumu için
    };
  },
  async created() {
    // Kullanıcı oturum açmışsa korumalı route'a yönlendir
    if (localStorage.getItem('auth-token')) {
      await this.checkAuth();
    }
  },
  methods: {
    // Kullanıcı oturumunu kontrol et
    async checkAuth() {
      try {
        const response = await this.fetchProtectedData();
        if (response.ok) {
          window.location.href = '/cp';
        }
      } catch (error) {
        console.error("❌ Error:", error);
      }
    },

    // Korumalı route'dan veri çek
    async fetchProtectedData() {
      return await fetch('http://localhost:3000/api/protected', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      });
    },

    // Giriş işlemi
    async login() {
      this.error = '';
      this.isLoading = true; // Yükleme durumunu aktif et

      try {
        const response = await fetch('http://localhost:3000/api/post/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
          credentials: 'include',
        });

        const data = await response.json();

        if (data.error) {
          this.handleLoginError(data.error);
          return;
        }

        // Token ve kullanıcı bilgilerini kaydet
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user));

        // Korumalı route'a yönlendir
        await this.checkAuth();
      } catch (err) {
        this.handleLoginError('Bir hata oluştu. Lütfen tekrar deneyin.');
        console.error("Login hatası => ", err);
      } finally {
        this.isLoading = false; // Yükleme durumunu pasif et
      }
    },

    // Giriş hatalarını yönet
    handleLoginError(error) {
      switch (error) {
        case 'Invalid credentials':
          this.error = 'Geçersiz e-posta veya şifre.';
          break;
        case 'Failed to fetch user data':
          this.error = 'Kullanıcı bilgileri alınamadı.';
          break;
        default:
          this.error = 'Beklenmedik bir hata oluştu.';
          break;
      }
      console.log("Hata => ", error);
    }
  },
};
</script>

<style scoped>
/* Ekstra stiller buraya eklenebilir */
</style>
