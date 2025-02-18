<template>
  <button
      id="help-button"
      @click="openHelpModal"
      class="fixed bottom-4 right-6 bg-blue-500 text-white p-2 rounded-xl pt-3 shadow-lg hover:bg-blue-600 transition-all z-50 jump"
  >
    <i class="material-icons text-md">help</i>
  </button>

  <HelpModal
      :isOpen="isHelpModalOpen"
      @close="closeHelpModal"
  />
</template>

<script>
import {ref} from 'vue';
import HelpModal from './Modal/HelpModal.vue';

export default {
  name: 'HelpButton',
  components: {HelpModal},

  setup() {
    const isHelpModalOpen = ref(false);
    const helpButton = ref(null);
    helpButton.value = undefined;


    const openHelpModal = () => {
      isHelpModalOpen.value = true;
      helpButton.value?.classList.remove('jump');
    };

    const closeHelpModal = () => {
      isHelpModalOpen.value = false;
      helpButton.value?.classList.add('jump');
    };



    return {isHelpModalOpen, openHelpModal, closeHelpModal, helpButton};
  }
};


</script>

<style scoped>
@keyframes jump {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.jump {
  animation: jump 4s infinite;
}
</style>