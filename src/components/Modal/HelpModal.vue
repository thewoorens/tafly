<template>
  <!-- Modal Arka Planı -->
  <div
      v-if="isOpen"
      @click.self="closeModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4"
  >
    <!-- Modal Kutusu -->
    <div @click.stop class="bg-white rounded-xl shadow-2xl w-11/12 md:w-96 p-6 relative">
      <!-- Kapatma Butonu -->
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
        <span class="material-icons text-3xl">close</span>
      </button>

      <!-- Modal Başlığı -->
      <div class="flex flex-col items-center text-center border-b pb-4">
        <span class="material-icons text-blue-500 text-5xl">help_outline</span>
        <h2 class="text-2xl font-bold text-gray-800 mt-2">Yardım</h2>
        <p class="text-sm text-gray-500">Sistem bilgilerinizi görüntüleyin</p>
      </div>

      <!-- Sunucu Durumu -->
      <div class="mt-4 p-3 bg-gray-100 rounded-lg flex items-center">
        <div>
          <label class="block text-sm font-semibold text-gray-700">Sunucu Durumu</label>
          <div class="flex items-center">
            <span
                :class="{
                'bg-green-500': isServerConnected,
                'bg-red-500': !isServerConnected,
              }"
                class="w-3 h-3 rounded-full mr-2"
            ></span>
            <span class="font-medium" :class="isServerConnected ? 'text-green-600' : 'text-red-600'">
              {{ isServerConnected ? 'Sunucuya bağlı' : 'Sunucuya bağlı değil' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Kullanıcı Bilgileri -->
      <div class="mt-4 p-3 bg-gray-100 rounded-lg flex items-center">
        <div>
          <label class="block text-sm font-semibold text-gray-700">Kullanıcı Bilgileri</label>
          <div class="space-y-1 text-gray-800">
            <div><strong>Ad-Soyad:</strong> {{ userInfo.owner_first_name }} {{ userInfo.owner_last_name }}</div>
            <div><strong>E-posta:</strong> {{ userInfo.email }}</div>
            <div><strong>İşletme Adı:</strong> <span class="capitalize">{{ userInfo.business_name }}</span></div>
            <div><strong>İşletme Türü:</strong> <span class="capitalize">{{ userInfo.business_type }}</span></div>
          </div>
        </div>
      </div>

      <!-- Sürüm Bilgisi -->
      <div class="mt-4 p-3 bg-gray-100 rounded-lg flex items-center">
        <div>
          <label class="block text-sm font-semibold text-gray-700">Sürüm</label>
          <div class="text-gray-800 font-medium">{{ version }}</div>
        </div>
      </div>

      <!-- İmza -->
      <div class="text-center text-sm text-gray-500 mt-6 border-t pt-4">
        <a href="https://kernelsoftware.com.tr" target="_blank" class="hover:underline text-blue-600 font-medium">
          kernelsoftware tarafından geliştirildi ❤️
        </a>
      </div>
    </div>
  </div>
</template>

<script>
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
    userInfo: {
      type: Object,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close'); // close event'ini tetikle
    },
  },
};
</script>

<style scoped>
</style>
