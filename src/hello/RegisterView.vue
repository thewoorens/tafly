<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
      <form @submit.prevent="register">
        <!-- İşletme Sahibi Adı -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="owner_first_name">İşletme Sahibi Adı</label>
          <input
              v-model="owner_first_name"
              type="text"
              id="owner_first_name"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.owner_first_name" class="text-red-500 text-xs">{{ errors.owner_first_name }}</p>
        </div>

        <!-- İşletme Sahibi Soyadı -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="owner_last_name">İşletme Sahibi Soy Adı</label>
          <input
              v-model="owner_last_name"
              type="text"
              id="owner_last_name"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.owner_last_name" class="text-red-500 text-xs">{{ errors.owner_last_name }}</p>
        </div>

        <!-- E-posta -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="email">E-posta</label>
          <input
              v-model="email"
              type="email"
              id="email"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</p>
        </div>
        <!-- Şifre -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2" for="password">Şifre</label>
          <input
              v-model="password"
              type="password"
              id="password"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</p>
        </div>
        <!-- Şifre -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2" for="password">Şifre Tekrar</label>
          <input
              v-model="passwordRepeat"
              type="password"
              id="passwordRepeat"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.passwordRepeat" class="text-red-500 text-xs">{{ errors.passwordRepeat }}</p>
        </div>

        <button
            type="submit"
            id="registerButton"
            class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Kayıt Ol
        </button>
      </form>

      <!-- Kayıt olamama hatası -->
      <div v-if="globalError" class="mt-4 text-center text-red-500">
        <p>{{ globalError }}</p>
      </div>

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
      owner_first_name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      owner_last_name: '',
      errors: {},
      globalError: '',
    };
  },
  created() {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:3000/api/protected', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Unauthorized');
            }
            return response.json();
          })
          .then(data => {
            console.log("🔹 Protected data:", data);
            this.$router.push('/cp'); // Vue Router ile yönlendirme
          })
          .catch(error => {
            console.error("❌ Error:", error);
            localStorage.removeItem('auth-token'); // Geçersiz token'ı temizle
          });
    } else {
      console.log("No user found");
    }
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = {}; // Önceki hataları temizle

      // Alan doğrulama
      if (!this.owner_first_name) {
        this.errors.owner_first_name = 'İşletme sahibi adı zorunludur.';
        valid = false;
      }

      if (!this.owner_last_name) {
        this.errors.owner_last_name = 'İşletme sahibi soyadı zorunludur.';
        valid = false;
      }

      if (!this.email) {
        this.errors.email = 'E-posta zorunludur.';
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = 'Geçerli bir e-posta adresi girin.';
        valid = false;
      }

      if (!this.password) {
        this.errors.password = 'Şifre zorunludur.';
        valid = false;
      } else if (this.password.length < 6) {
        this.errors.password = 'Şifre en az 6 karakter uzunluğunda olmalıdır.';
        valid = false;
      }

      if (this.passwordRepeat !== this.password) {
        this.errors.passwordRepeat = 'Parolalar eşleşmiyor.';
        valid = false;
      }

      return valid;
    },

    register() {
      const button = document.getElementById("registerButton");
      button.disabled = true;
      button.classList.add('opacity-50');
      this.globalError = '';
      if (!this.validateForm()) {
        return;
      }

      const user = {
        email: this.email,
        password: this.password,
        ownerFirstName: this.owner_first_name,
        ownerLastName: this.owner_last_name
      };

      fetch('http://localhost:3000/api/post/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
          .then((response) => {
            if (!response.ok) {
              return response.json().then(data => {
                throw new Error(data.error || 'Kayıt sırasında bir hata oluştu.');
              });
            }
            button.disabled = false;
            button.classList.remove('opacity-50');
            return response.json();
          })
          .then(() => {
            this.$router.push('/login'); // Kayıt başarılıysa login sayfasına yönlendir
            button.disabled = false;
            button.classList.remove('opacity-50');
          })
          .catch((error) => {
            this.globalError = error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
            console.error('Kayıt hatası:', error);
            button.disabled = false;
            button.classList.remove('opacity-50');
          });
    },
  },
};
</script>

<style scoped>
</style>