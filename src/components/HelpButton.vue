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
import HelpModal from './Modal/HelpModal.vue';

export default {
  name: 'HelpButton',
  components: {
    HelpModal,
  },
  data() {
    return {
      isHelpModalOpen: false,
      isServerConnected: true,
      userInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
      },
      version: '1.0.0',
    };
  },
  methods: {
    openHelpModal() {
      this.isHelpModalOpen = true;
      document.getElementById('help-button').classList.remove('jump');
    },
    closeHelpModal() {
      this.isHelpModalOpen = false;
      document.getElementById('help-button').classList.add('jump');

    },
  },
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