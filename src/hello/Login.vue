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
            id="submitButton"
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
      isLoading: false,
    };
  },
  async created() {
    if (localStorage.getItem('auth-token')) {
      await this.fetchProtectedData();
    }
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

    async login() {
      const button = document.getElementById("submitButton");
      button.disabled = true;
      button.classList.add('opacity-50');
      this.error = '';
      this.isLoading = true;

      this.$axios.post('http://localhost:3000/api/auth/login', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        this.isLoading = false;
        button.disabled = false;
        button.style.backgroundColor = "blue";
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("auth-token", response.data.token);
        this.$axios.get(`http://localhost:3000/api/business/get?ownerId=${JSON.parse(localStorage.getItem('userInfo'))?._id}`)
            .then(response => {
              localStorage.setItem("businessInfo", JSON.stringify(response.data.business));
            }).catch(error => {
          console.log(error);
        });
        window.location.href = '/cp';
      }).catch((err) => {
        this.handleLoginError(err)
        button.disabled = false;
        button.classList.remove('opacity-50');
      })

    },

    handleLoginError(error) {
      switch (error.response.status) {
        case 400:
          this.error = 'Geçersiz e-posta veya şifre.';
          break;
        default:
          this.error = 'Beklenmedik bir hata oluştu.';
          break;
      }
    }
  },
};
</script>

<style scoped>

</style>
