<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>
      <form @submit.prevent="register">
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
import Swal from "sweetalert2";

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      errors: {},
      globalError: null,
    };
  },
  created() {
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      this.fetchProtectedData();
    } else {
      console.log("No user found");
    }
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = {};

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

      if (!this.validateForm()) {
        button.disabled = false;
        button.classList.remove('opacity-50');
        return;
      }

      const user = {
        email: this.email,
        password: this.password,
      };
      this.$axios.post('http://localhost:3000/api/auth/register', {
        email: user.email,
        password: user.password
      }).then(() => {
        Swal.fire({
          title: 'Kayıt Başarılı!',
          text: 'Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.',
          icon: 'success',
          confirmButtonText: 'Tamam'
        }).then(
            () => {
              this.$router.push('/login');
            }
        );
      }).catch((err) => {
        this.globalError = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        button.disabled = false;
        button.classList.remove('opacity-50');
        if (err.response && err.response.status === 400) {
          this.globalError = "Böyle bir mail adresi kayıtlı";
        } else {
          this.globalError = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        }
      });


    },
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
  },
};
</script>

<style scoped>
</style>