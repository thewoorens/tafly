<template>
  <button
      id="help-button"
      @click="openHelpModal"
      class="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-xl pt-4 shadow-lg hover:bg-blue-600 transition-all z-50 jump"
  >
    <i class="material-icons">help</i>
  </button>

  <HelpModal
      :isOpen="isHelpModalOpen"
      :isServerConnected="isServerConnected"
      :userInfo="userInfo"
      :version="version"
      @close="closeHelpModal"
  />
</template>

<script>
import {ref, onMounted} from 'vue';
import HelpModal from './Modal/HelpModal.vue';
import {fetchData} from '@/apiService';

export default {
  name: 'HelpButton',
  components: {HelpModal},
  setup() {
    const isHelpModalOpen = ref(false);
    const isServerConnected = ref(true);
    const userInfo = ref({name: 'Ad Bulunamadı', email: 'Mail Bulunamadı', role: 'Rol Bulunamadı'});
    const version = ref('1.0.0');
    const helpButton = ref(null);

    const checkServerStatus = async () => {
      const data = await fetchData('http://localhost:3000/api/get/server-status');
      if (data) isServerConnected.value = data.server;
    };

    const getUserInfo = async () => {
      const userId = 18;
      const data = await fetchData(`http://localhost:3000/api/get/?userId=${userId}`);
      if (data) userInfo.value = data;
    };

    const getVersion = async () => {
      const data = await fetchData('http://localhost:3000/api/get/version');
      if (data) version.value = data.version;
    };

    const openHelpModal = () => {
      isHelpModalOpen.value = true;
      helpButton.value?.classList.remove('jump');
    };

    const closeHelpModal = () => {
      isHelpModalOpen.value = false;
      helpButton.value?.classList.add('jump');
    };

    onMounted(() => {
      checkServerStatus();
      setInterval(checkServerStatus, 5000);
      getUserInfo();
      getVersion();
    });

    return {isHelpModalOpen, isServerConnected, userInfo, version, openHelpModal, closeHelpModal, helpButton};
  }
};

</script>

<style scoped>
@keyframes jump {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.jump {
  animation: jump 3s infinite;
}
</style>