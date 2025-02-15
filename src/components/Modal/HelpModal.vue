<template>
  <transition name="fade">
    <div
        v-if="isOpen"
        @click.self="closeModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-6"
    >
      <transition name="slide">
        <div @click.stop class="bg-white rounded-xl shadow-2xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 relative">
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
            <span class="material-icons text-3xl">close</span>
          </button>

          <div class="text-center text-sm text-gray-500 mt-6 pt-6">
            <a
                href="https://kernelsoftware.com.tr"
                target="_blank"
                class="text-blue-600 font-medium select-none"
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
import {watch} from 'vue';

export default {
  name: 'HelpModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, {emit}) {

    watch(
        () => props.isOpen,
        (newVal) => {
          if (newVal) {
              console.log();
          }
        }
    );

    const closeModal = () => {
      emit('close');
    };

    return {
      closeModal,
    };
  },
};
</script>
<style scoped>

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