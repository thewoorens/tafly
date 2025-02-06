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

        <!-- İşletme Adı -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="business_name">İşletme Adı</label>
          <input
              v-model="business_name"
              type="text"
              id="business_name"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.business_name" class="text-red-500 text-xs">{{ errors.business_name }}</p>
        </div>

        <!-- İşletme Tipi -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="business_type">İşletme Tipi</label>
          <input
              v-model="business_type"
              type="text"
              id="business_type"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
          <p v-if="errors.business_type" class="text-red-500 text-xs">{{ errors.business_type }}</p>
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

        <button
            type="submit"
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
      business_name: '',
      business_type: '',
      owner_last_name: '',
      errors: {}, // Hata mesajları için obje
      globalError: '', // Global hata mesajı
    };
  },
  created() {
    // Kullanıcının oturum açıp açmadığını kontrol et
    fetch('http://localhost:3000/api/protected', {credentials: 'include'})
        .then(res => {
          if (res.ok) {
            // Kullanıcı zaten giriş yapmışsa, otomatik olarak /cp sayfasına yönlendir
            this.$router.push('/cp');
          }
        })
        .catch(err => console.log("Oturum kontrol hatası => ", err));
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

      if (!this.business_name) {
        this.errors.business_name = 'İşletme adı zorunludur.';
        valid = false;
      }

      if (!this.business_type) {
        this.errors.business_type = 'İşletme tipi zorunludur.';
        valid = false;
      }

      if (!this.password) {
        this.errors.password = 'Şifre zorunludur.';
        valid = false;
      } else if (this.password.length < 6) {
        this.errors.password = 'Şifre en az 6 karakter uzunluğunda olmalıdır.';
        valid = false;
      }

      return valid;
    },

    register() {
      this.globalError = ''; // Global hata mesajını sıfırla
      if (!this.validateForm()) {
        return; // Hata varsa form gönderilmez
      }

      const user = {
        email: this.email,
        password: this.password,
        businessName: this.business_name,
        businessType: this.business_type,
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
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.globalError = data.error;
              console.error('Kayıt hatası:', data.error);
            } else {
              console.log('Kayıt başarılı:', data);
              this.$router.push('/login');
            }
          })
          .catch((error) => {
            this.globalError = 'Bir hata oluştu. Lütfen tekrar deneyin.';
            console.error('Kayıt hatası:', error);
          });
    },
  },
};
</script>

<style scoped>
</style>