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
    };
  },
  methods: {
    login() {
      // Giriş işlemi burada yapılacak
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('auth/login', user) // Vuex action'ını tetikle
          .then(() => {
            this.$router.push('/'); // Giriş başarılıysa ana sayfaya yönlendir
          })
          .catch((error) => {
            alert('Giriş başarısız: ' + error.message); // Hata mesajı göster
          });
    },
  },
};
</script>

<style scoped>
/* Ekstra stiller buraya eklenebilir */
</style>