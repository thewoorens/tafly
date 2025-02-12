<template>
  <!-- Modal Arka Planı -->
  <transition name="fade">
    <div
        v-if="isOpen"
        @click.self="closeModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-6"
    >
      <!-- Modal Kutusu -->
      <transition name="slide">
        <div @click.stop class="bg-white rounded-xl shadow-2xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 relative">
          <!-- Kapatma Butonu -->
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
            <span class="material-icons text-3xl">close</span>
          </button>

          <!-- Modal Başlığı -->
          <div class="flex flex-col items-center text-center border-b pb-6">
            <span class="material-icons text-blue-500 text-5xl">help_outline</span>
            <h2 class="text-2xl font-bold text-gray-800 mt-2">Yardım</h2>
            <p class="text-sm text-gray-500">Sistem bilgilerinizi görüntüleyin</p>
          </div>

          <!-- Veri Yoksa Uyarı Mesajı -->
          <div v-if="!userInfo" class="mt-6 text-center text-gray-600">
            <p>Kullanıcı bilgileri bulunamadı.</p>
          </div>

          <!-- Veri Varsa İçerik -->
          <div v-else class="mt-6 space-y-6">
            <!-- Sunucu Durumu -->
            <div class="p-4 bg-gray-50 rounded-lg">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Sunucu Durumu</label>
              <div class="flex items-center space-x-2">
                <span
                    :class="{
                      'bg-green-500 animate-pulse': isServerConnected,
                      'bg-red-500': !isServerConnected,
                    }"
                    class="w-3 h-3 rounded-full"
                ></span>
                <span class="font-medium" :class="isServerConnected ? 'text-green-600' : 'text-red-600'">
                  {{ isServerConnected ? 'Sunucuya bağlı' : 'Sunucuya bağlı değil' }}
                </span>
              </div>
            </div>

            <!-- Kullanıcı Bilgileri -->
            <div class="p-4 bg-gray-50 rounded-lg">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Kullanıcı Bilgileri</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">person</span>
                  <span class="text-gray-800">{{ userInfo.owner_first_name }} {{ userInfo.owner_last_name }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">email</span>
                  <span class="text-gray-800">{{ userInfo.email }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">business</span>
                  <span class="text-gray-800 capitalize">{{ userInfo.business_name }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">category</span>
                  <span class="text-gray-800 capitalize">{{ userInfo.business_type }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">location_on</span>
                  <span class="text-gray-800">{{ userInfo.business_address }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="material-icons text-gray-600">phone</span>
                  <span class="text-gray-800">{{ userInfo.phone_number }}</span>
                </div>
              </div>
            </div>

            <!-- Sosyal Medya Linkleri -->
            <div class="p-4 bg-gray-50 rounded-lg">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Sosyal Medya</label>
              <div class="flex space-x-4">
                <a
                    :href="userInfo.social_media.instagram"
                    target="_blank"
                    class="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <span class="material-icons">camera_alt</span>
                  <span>Instagram</span>
                </a>
                <a
                    :href="userInfo.social_media.facebook"
                    target="_blank"
                    class="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <span class="material-icons">thumb_up</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <!-- Sürüm Bilgisi -->
            <div class="p-4 bg-gray-50 rounded-lg">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Sürüm</label>
              <div class="text-gray-800 font-medium">{{ version }}</div>
            </div>
          </div>

          <!-- İmza -->
          <div class="text-center text-sm text-gray-500 mt-6 border-t pt-6">
            <a
                href="https://kernelsoftware.com.tr"
                target="_blank"
                class="hover:underline text-blue-600 font-medium"
            >
              kernelsoftware tarafından geliştirildi ❤️
            </a>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HelpModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    isServerConnected: {
      type: Boolean,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  setup() {
    const userInfo = ref(null);

    // localStorage'dan kullanıcı bilgilerini al
    const getUserInfo = () => {
      const businessInfo = localStorage.getItem('businessInfo');
      if (businessInfo) {
        userInfo.value = JSON.parse(businessInfo);
        console.log("userInfo: ", userInfo.value);
      } else {
        console.log("Kullanıcı bilgileri bulunamadı.");
      }
    };

    return {
      userInfo,
      getUserInfo,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close'); // close event'ini tetikle
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.getUserInfo(); // Modal açıldığında kullanıcı bilgilerini al
      }
    },
  },
};
</script>

<style scoped>
/* Animasyonlar */
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>