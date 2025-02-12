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
        <span class="material-icons text-blue-500 text-5xl">settings</span>
        <h2 class="text-2xl font-bold text-gray-800 mt-2">{{ $t('settings.title') }}</h2>
        <p class="text-sm text-gray-500">Genel ayarlarınızı yönetin</p>
      </div>

      <!-- Dil Seçimi -->
      <div class="mt-4 p-3 bg-gray-100 rounded-lg flex items-center">
        <div class="w-full">
          <label class="block text-sm font-semibold text-gray-700">{{ $t('settings.language') }}</label>
          <select
              v-model="selectedLanguage"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>


      <div class="flex justify-between mt-4">
        <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all flex items-center"
        >
          <span class="material-icons text-white text-lg mr-1">logout</span>
          Çıkış Yap
        </button>
        <button
            @click="saveSettings"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center"
        >
          <span class="material-icons text-white text-lg mr-1">save</span>
          {{ $t('settings.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveSettings() {
      localStorage.setItem('language', this.selectedLanguage);
      this.$i18n.locale = this.selectedLanguage;
      this.closeModal();
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(res => {
            if (res.ok) {
              window.location.reload();
            }
          })
          .catch(err => console.log("Çıkış hatası => ", err));

      this.closeModal();
      window.location.reload();

    },
  },
};
</script>
