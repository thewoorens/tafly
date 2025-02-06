<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="name">Ad</label>
          <input
              v-model="name"
              type="text"
              id="name"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
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
          Kayıt Ol
        </button>
      </form>
      <div class="mt-4 text-center">
        <router-link to="/login" class="text-blue-500 hover:underline">Zaten hesabınız var mı? Giriş Yapın</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      // Kayıt işlemi burada yapılacak
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('auth/register', user) // Vuex action'ını tetikle
          .then(() => {
            this.$router.push('/login'); // Kayıt başarılıysa giriş sayfasına yönlendir
          })
          .catch((error) => {
            alert('Kayıt başarısız: ' + error.message); // Hata mesajı göster
          });
    },
  },
};
</script>

<style scoped>
/* Ekstra stiller buraya eklenebilir */
</style>