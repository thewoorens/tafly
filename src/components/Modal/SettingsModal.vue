<template>
  <div
      v-if="isOpen"
      @click.self="closeModal"
      class="fixed overflow-y-auto inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4"
  >
    <div @click.stop class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
        <span class="material-icons text-3xl">close</span>
      </button>

      <div class=" flex flex-col items-center text-center border-b pb-4">
        <span class="material-icons text-blue-500 text-5xl">settings</span>
        <h2 class="text-2xl font-bold text-gray-800 mt-2">{{ $t('settings.title') }}</h2>
        <p class="text-sm text-gray-500">{{ $t('ManageYourgeneralsettings') }}</p>
      </div>

      <div class="mt-4 space-y-4 ">
        <div>
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
        <label class="block text-sm font-semibold text-gray-700">Açılır Menü Gösterilsin</label>
        <div class="flex space-x-2 mt-2">
          <label
              :class="{'bg-blue-500 text-white': fabMenu === true, 'bg-gray-200 text-gray-700': fabMenu !== true}"
              class="px-4 py-2 rounded-lg cursor-pointer">
            <input type="radio" v-model="fabMenu" :value="true" class="hidden"> Evet
          </label>
          <label
              :class="{'bg-blue-500 text-white': fabMenu === false, 'bg-gray-200 text-gray-700': fabMenu !== false}"
              class="px-4 py-2 rounded-lg cursor-pointer">
            <input type="radio" v-model="fabMenu" :value="false" class="hidden"> Hayır
          </label>
        </div>

        <div v-if="fabMenu">
          <label class="block text-sm font-semibold text-gray-700">Garson Çağırılabilsin</label>
          <div class="flex space-x-2 mt-2">
            <label
                :class="{'bg-blue-500 text-white': enableWaiter === true, 'bg-gray-200 text-gray-700': enableWaiter !== true}"
                class="px-4 py-2 rounded-lg cursor-pointer">
              <input type="radio" v-model="enableWaiter" :value="true" class="hidden"> Evet
            </label>
            <label
                :class="{'bg-blue-500 text-white': enableWaiter === false, 'bg-gray-200 text-gray-700': enableWaiter !== false}"
                class="px-4 py-2 rounded-lg cursor-pointer">
              <input type="radio" v-model="enableWaiter" :value="false" class="hidden"> Hayır
            </label>
          </div>
          <div v-if="enableWaiter" class="mt-2">
            <input v-model="waiterMessage" type="text" placeholder="Çağrı mesajı"
                   class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>


          <div>
            <label class="block text-sm font-semibold text-gray-700">Wi-Fi Şifresi Gösterilsin</label>
            <div class="flex space-x-2 mt-2">
              <label
                  :class="{'bg-blue-500 text-white': enableWifi === true, 'bg-gray-200 text-gray-700': enableWifi !== true}"
                  class="px-4 py-2 rounded-lg cursor-pointer">
                <input type="radio" v-model="enableWifi" :value="true" class="hidden"> Evet
              </label>
              <label
                  :class="{'bg-blue-500 text-white': enableWifi === false, 'bg-gray-200 text-gray-700': enableWifi !== false}"
                  class="px-4 py-2 rounded-lg cursor-pointer">
                <input type="radio" v-model="enableWifi" :value="false" class="hidden"> Hayır
              </label>
            </div>
            <div v-if="enableWifi" class="mt-2">
              <input v-model="wifiPassword" type="text" placeholder="Wi-Fi Şifresi"
                     class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700">Yardım Sayfası Gösterilsin</label>
            <div class="flex space-x-2 mt-2">
              <label
                  :class="{'bg-blue-500 text-white': enableHelp === true, 'bg-gray-200 text-gray-700': enableHelp !== true}"
                  class="px-4 py-2 rounded-lg cursor-pointer">
                <input type="radio" v-model="enableHelp" :value="true" class="hidden"> Evet
              </label>
              <label
                  :class="{'bg-blue-500 text-white': enableHelp === false, 'bg-gray-200 text-gray-700': enableHelp !== false}"
                  class="px-4 py-2 rounded-lg cursor-pointer">
                <input type="radio" v-model="enableHelp" :value="false" class="hidden"> Hayır
              </label>
            </div>
            <div v-if="enableHelp" class="mt-2">
              <input v-model="helpUrl" type="text" placeholder="Yardım Sayfası URL'si"
                     class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
        </div>
      </div>


      <div class="flex justify-between mt-6">
        <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all flex items-center"
        >
          <span class="material-icons text-white text-lg mr-1">logout</span>
          {{ $t('signOut') }}
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
      fabMenu: false,
      enableWaiter: false,
      waiterMessage: '',
      enableWifi: false,
      wifiPassword: '',
      enableHelp: false,
      helpUrl: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveSettings() {
      const settings = {
        language: this.selectedLanguage,
        enableWaiter: this.enableWaiter,
        waiterMessage: this.waiterMessage,
        enableWifi: this.enableWifi,
        wifiPassword: this.wifiPassword,
        enableHelp: this.enableHelp,
        helpUrl: this.helpUrl,
        fabMenu: this.fabMenu,
      };

      fetch('http://localhost:3000/api/business/settings/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId: JSON.parse(localStorage.getItem('userInfo'))?._id,
          settings: settings,
        }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.message === "Ayarlar güncellendi.") {
              this.$i18n.locale = this.selectedLanguage;
              this.closeModal();
              window.location.href = "/cp";
            } else {
              console.error(data.message);
            }
          })
          .catch(error => console.error('Sunucu hatası:', error));
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
      }).then(res => {
        if (res.ok) {
          window.location.reload();
        }
      }).catch(err => console.log("Çıkış hatası => ", err));

      this.closeModal();
      window.location.reload();
    },
    loadSettings() {
      const ownerId = JSON.parse(localStorage.getItem('userInfo'))?._id;
      if (!ownerId) {
        console.error("Kullanıcı kimliği gereklidir.");
        return;
      }

      fetch(`http://localhost:3000/api/business/settings/read?ownerId=${ownerId}`)
          .then(response => response.json())
          .then(data => {
            if (data.settings) {
              this.selectedLanguage = data.settings.language || this.selectedLanguage;
              this.enableWaiter = data.settings.enableWaiter || false;
              this.waiterMessage = data.settings.waiterMessage || '';
              this.enableWifi = data.settings.enableWifi || false;
              this.wifiPassword = data.settings.wifiPassword || '';
              this.enableHelp = data.settings.enableHelp || false;
              this.fabMenu = data.settings.fabMenu || false;
              this.helpUrl = data.settings.helpUrl || '';
            } else {
              console.error(data.message);
            }
          })
          .catch(error => console.error('Sunucu hatası:', error));
    }
  },
  created() {
    this.loadSettings();
  }
};
</script>