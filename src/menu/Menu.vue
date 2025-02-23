<template>
  <div class="menu-container p-4">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <!-- Existing content -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">{{ businessDetails.name }}</h1>
        <div class="relative inline-block">
          <button @click="toggleLanguageMenu" class="px-4 py-2 bg-gray-200 rounded-md focus:outline-none">
            Dil: {{ selectedLanguage }}
          </button>
          <ul v-if="isLanguageMenuOpen" class="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg">
            <li v-for="(lang, code) in languages" :key="code" @click="changeLanguage(code)"
                class="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {{ lang }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="businessDetails" class="text-center mb-4">
        <img v-if="businessDetails.logo" :src="businessDetails.logo" alt="Logo"
             class="business-logo mx-auto w-24 h-24 object-cover rounded-full">
        <h2 class="text-lg font-semibold">{{ businessDetails.name }}</h2>
        <p class="text-gray-600">{{ businessDetails.address }}</p>
        <p class="text-gray-600">{{ businessDetails.type }}</p>
        <p><a :href="businessDetails.social" target="_blank" class="text-blue-500">Sosyal Medya</a></p>
        <p><a :href="'tel:'+businessDetails.phone" target="_blank" class="text-blue-500">{{ businessDetails.phone }}</a>
        </p>
        <p><a :href="'mailto:'+businessDetails.email" target="_blank" class="text-blue-500">{{
            businessDetails.email
          }}</a></p>
      </div>
      <div v-else class="text-center">
        <h2>Yükleniyor...</h2>
      </div>
      <div v-if="categories.length" class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Kategoriler</h3>
        <ul class="space-y-4">
          <li v-for="category in categories" :key="category.tr.name" class="p-4 bg-gray-100 rounded-lg">
            <h4 class="text-md font-semibold">{{ category[selectedLanguage].name }}</h4>
            <p class="text-gray-600">{{ category[selectedLanguage].description }}</p>
          </li>
        </ul>
      </div>
      <div class="fab-container" v-if="settings.fabMenu">
        <div class="fab bg-blue-600 fab-icon-holder" :class="{ 'open': isFabMenuOpen }" @click="toggleFabMenu">
          <div v-if="isFabMenuOpen" class="mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </div>
          <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>
          </div>
        </div>
        <div class="fab-options" :class="{ 'open': isFabMenuOpen }">
          <span v-if="settings.enableWaiter" class="bg-blue-600 text-white font-medium" @click="callWaiter">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"/>
            </svg>
            <span class="fab-label font-medium" style="margin-top: 8px;">Garson Çağır</span>
          </span>
          <span v-if="settings.enableWifi" class="bg-blue-600 text-white" @click="showWifiPassword">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"/>
            </svg>
            <span class="fab-label font-medium" style="margin-top: 8px;">Wi-Fi Şifresi</span>
          </span>
          <span v-if="settings.enableHelp" class="bg-blue-600 text-white" @click="showHelp">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
            </svg>
            <span class="fab-label font-medium" style="margin-top: 8px;">Yardım</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {ref} from "vue";
import Swal from "sweetalert2";

export default {
  name: 'MenuView',
  data() {
    return {
      businessDetails: ref(''),
      menuName: useRouter().currentRoute.value.params.menuName || 'Böyle bir menü yok',
      categories: ref([]),
      settings: ref([]),
      languages: {
        tr: 'Türkçe',
        en: 'English'
      },
      selectedLanguage: 'tr',
      isLanguageMenuOpen: false,
      isFabMenuOpen: false,
      isLoading: true // Loading state
    }
  },
  methods: {
    toggleLanguageMenu() {
      this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    },
    changeLanguage(code) {
      this.selectedLanguage = code;
      this.isLanguageMenuOpen = false;
    },
    toggleFabMenu() {
      this.isFabMenuOpen = !this.isFabMenuOpen;
    },
    callWaiter() {
      Swal.fire({
        title: 'Garson Çağır',
        text: 'Garson çağırmak için önce masa numaranızı girin',
        input: 'number',
        inputAttributes: {
          min: 1,
          step: 1
        },
        icon: 'question',
        confirmButtonText: 'Çağır',
        cancelButtonText: 'İptal Et',
        showCancelButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true
      }).then(
          (result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Garson Çağrıldı',
                html: `Masa numarası: ${result.value}<br/> İşletme Mesajı: ${this.settings.waiterMessage}`,
                icon: 'success',
                confirmButtonText: 'Tamam'
              });
            }
          }
      );
      this.isFabMenuOpen = false;
    },
    showWifiPassword() {
      Swal.fire({
        title: 'Wi-Fi Şifresi',
        text: "Wi-Fi Şifresi: " + this.settings.wifiPassword,
        icon: 'info',
        confirmButtonText: 'Tamam'
      });
      this.isFabMenuOpen = false;
    },
    showHelp() {
      window.open(this.settings.helpUrl, '_blank');
      this.isFabMenuOpen = false;
    }
  },
  async created() {
    try {
      const response = await this.$axios.get(`http://localhost:3000/api/visitor/get/?visitorId=${this.menuName}`);
      console.log(response.data);
      this.businessDetails = response.data;
      this.categories = response.data.categories;
      this.settings = response.data.settings;
      console.log("Categories:", response.data.categories);
      this.isLoading = false;
    } catch (error) {
      window.location.href = 'https://kernelsoftware.com.tr';
    }
    console.log('Menu created');
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3b82f6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Existing styles */
.fab-container {
  position: fixed;
  bottom: 30px;
  right: 35px;
  z-index: 999;
}

.fab {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.fab.open {
  transform: rotate(90deg);
  background-color: black;
}

.fab-icon-holder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-options {
  position: absolute;
  bottom: 70px;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.fab-options.open {
  opacity: 1;
  visibility: visible;
}

.fab-options span {
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 15px;
}

.fab-label {
  white-space: nowrap;
  margin-top: 5px;
}
</style>