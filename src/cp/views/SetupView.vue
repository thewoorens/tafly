<template>
  <div class="max-w-lg mx-auto p-6 text-center">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Tafly İşletme Kurulumu</h1>

    <div v-if="currentStep === 1" class="step">
      <h2 class="text-2xl font-semibold mb-4">Adım 1: İşletme Bilgileri</h2>
      <form @submit.prevent="nextStep" class="space-y-4">
        <div>
          <label for="businessName" class="block text-gray-700">İşletme Adı:</label>
          <input type="text" id="businessName" v-model="businessInfo.business_name" required
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <div>
          <label for="businessAddress" class="block text-gray-700">İşletme Adresi:</label>
          <input type="text" id="businessType" v-model="businessInfo.business_address" required
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <div>
          <label for="businessAddress" class="block text-gray-700">İşletme Türü:</label>
          <input type="text" id="businessAddress" v-model="businessInfo.business_type" required
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <button type="submit"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300">
          Sonraki Adım
        </button>
      </form>
    </div>

    <div v-if="currentStep === 2" class="step">
      <h2 class="text-2xl font-semibold mb-4">Adım 2: İletişim Bilgileri</h2>
      <form @submit.prevent="nextStep" class="space-y-4">
        <div>
          <label for="phone" class="block text-gray-700">Telefon Numarası:</label>
          <input type="tel" id="phone" v-model="businessInfo.phone" required
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <div>
          <label for="email" class="block text-gray-700">E-posta:</label>
          <input disabled type="email" id="email" v-model="businessInfo.email"
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <button type="submit"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300">
          Sonraki Adım
        </button>
      </form>
    </div>

    <div v-if="currentStep === 3" class="step">
      <h2 class="text-2xl font-semibold mb-4">Adım 3: Sosyal Medya Bilgileri</h2>
      <form @submit.prevent="nextStep" class="space-y-4">
        <div>
          <label for="instagram" class="block text-gray-700">Instagram:</label>
          <input type="url" id="instagram" v-model="businessInfo.socialMedia.instagram"
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <div>
          <label for="facebook" class="block text-gray-700">Facebook:</label>
          <input type="url" id="facebook" v-model="businessInfo.socialMedia.facebook"
                 class="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-green-300"/>
        </div>
        <button type="submit"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300">
          Sonraki Adım
        </button>
      </form>
    </div>

    <div v-if="currentStep === 4" class="step">
      <h2 class="text-2xl font-semibold mb-4">Adım 4: Özet ve Onay</h2>
      <div class="p-6 bg-gray-100 rounded-lg shadow-md">
        <p><strong>İşletme Adı:</strong> {{ businessInfo.name }}</p>
        <p><strong>Adres:</strong> {{ businessInfo.address }}</p>
        <p><strong>İşletme Türü:</strong> {{ businessInfo.type }}</p>
        <p><strong>Telefon:</strong> {{ businessInfo.phone }}</p>
        <p><strong>E-posta:</strong> {{ businessInfo.email }}</p>
        <p><strong v-if="this.businessInfo.socialMedia.facebook">Facebook Adresi: </strong><a style="color: blue;"
                                                                                              target="_blank"
                                                                                              :href="this.businessInfo.socialMedia.facebook">
          {{ businessInfo.socialMedia.facebook }}</a></p>
        <p><strong v-if="this.businessInfo.socialMedia.instagram">İnstagram Adresi: </strong><a style="color: blue;"
                                                                                                target="_blank"
                                                                                                :href="this.businessInfo.socialMedia.instagram">
          {{ businessInfo.socialMedia.instagram }}</a></p>
      </div>
      <button @click="submitSetup"
              class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300">
        Kurulumu Tamamla
      </button>
    </div>

    <div v-if="currentStep === 5" class="step animate-fade-in">
      <h2 class="text-2xl font-semibold text-green-600">Kurulum Tamamlandı!</h2>
      <p class="text-gray-700 mt-2">İşletme bilgileriniz başarıyla kaydedildi. 🎉</p>
      <button @click="reload()"
              class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300">
        Devam Et
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetupView',
  data() {
    return {
      currentStep: 1,
      businessInfo: {
        email: JSON.parse(localStorage.getItem("userInfo"))?.email,
        business_name: '',
        business_type: '',
        setup_status: true,
        business_address: '',
        phone: '',
        socialMedia: {
          instagram: '',
          facebook: ''
        }
      },
      userId: JSON.parse(localStorage.getItem("userInfo"))?.id
    };
  },
  methods: {
    async submitSetup() {
      console.log(this.businessInfo)
      const token = localStorage.getItem('auth-token');
      try {
        const response = await fetch('http://localhost:3000/api/post/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: this.userId,
            ...this.businessInfo
          }),
        });

        const data = await response.json();

        if (data.error) {
          console.error('Failed to save business info:', data.error);
          return;
        }
        this.nextStep();
      } catch (err) {
        console.error('Error saving business info:', err);
      }
    },
    nextStep() {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    reload() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
