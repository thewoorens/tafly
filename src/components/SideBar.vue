<template>
  <div class="h-full">
    <div v-if="isSidebarOpen"
         class="flex flex-col items-center w-50 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
      <a class="flex items-center w-full px-3 mt-3" href="#">
        <i class="material-icons">local_pizza</i>
        <span class="ml-2 text-sm font-bold">{{ $t('sidebar.title') }}</span>
      </a>
      <div class="w-full px-2">
        <div class="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          <router-link to="/cp/home" active-class="bg-gray-200"
                       class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="ml-2 text-sm font-medium">{{ $t('sidebar.home') }}</span>
          </router-link>
          <router-link to="/cp/stats" active-class="bg-gray-200"
                       class="flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded" href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="ml-2 text-sm font-medium">{{ $t('sidebar.statistics') }}</span>
          </router-link>
          <router-link to="/cp/category" active-class="bg-gray-200"
                       class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300">

            <i class="material-icons">inbox</i>
            <span class="ml-2 text-sm font-medium">{{ $t('category') }}</span>
          </router-link>
          <router-link to="/cp/products" active-class="bg-gray-200"
                       class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300">

            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="ml-2 text-sm font-medium">{{ $t('sidebar.products') }}</span>
          </router-link>
          <router-link to="/cp/survey" active-class="bg-gray-200"
                       class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
            <i class="material-icons">stars</i>
            <span class="ml-2 text-sm font-medium">{{ $t('surveys') }}</span>
            <span v-if="marked" class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
          </router-link>
        </div>
        <div class="flex flex-col items-center w-full mt-2 border-t border-gray-300">
          <a href="https://kernelsoftware.com.tr" target="_blank"
             class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300">

            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
            </svg>
            <span class="ml-2 text-sm font-medium">{{ $t('sidebar.docs') }}</span>
          </a>
          <a @click="openSettingsModal" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
             href="#">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
            <span class="ml-2 text-sm font-medium">{{ $t('settings.title') }}</span>
            <SettingsModal :isOpen="isSettingsModalOpen" @close="closeSettingsModal"/>
          </a>
          <a @click="toggleSidebar" class="flex items-center w-full h-12 px-3 mt-2  rounded hover:bg-gray-300" href="#">
            <i class="material-icons mr-3">{{ isSidebarOpen ? 'close' : 'menu' }}</i>
            <span class="text-sm font-medium">{{ isSidebarOpen ? $t('sidebar.hide') : $t('sidebar.show') }}</span>
          </a>
        </div>
      </div>
      <a class="flex items-center justify-center w-full h-16 mt-auto bg-gray-200" href="#">
        <i class="material-icons">open_in_new</i>
        <span class="ml-2 text-sm font-medium">{{ $t('previewMenu') }}</span>
      </a>
    </div>
    <div v-else class="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
      <a class="flex items-center justify-center mt-3" href="#">
        <i class="material-icons">local_pizza</i>
      </a>
      <div class="flex flex-col items-center mt-3 border-t border-gray-300">
        <router-link to="/cp/home" active-class="bg-gray-200"
                     class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </router-link>
        <router-link active-class="bg-gray-200" to="/cp/stats"
                     class="flex items-center justify-center w-12 h-12 mt-2  rounded" href="#">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </router-link>
        <router-link to="/cp/category" active-class="bg-gray-200"
                     class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300">

          <i class="material-icons">inbox</i>
        </router-link>
        <router-link active-class="bg-gray-200" to="/cp/products"
                     class="flex items-center justify-center w-12 h-12 mt-2  rounded" href="#">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </router-link>
        <router-link to="/cp/survey" active-class="bg-gray-200"
                     class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300" href="#">
          <i class="material-icons">stars</i>
          <span v-if="marked" class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
        </router-link>
      </div>
      <div class="flex flex-col items-center mt-2 border-t border-gray-300">
        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" target="_blank"
           href="https://kernelsoftware.com.tr">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
          </svg>
        </a>
        <a @click="openSettingsModal" class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
           href="#">
          <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
          </svg>
          <SettingsModal :isOpen="isSettingsModalOpen" @close="closeSettingsModal"/>
        </a>
        <a @click="toggleSidebar" class="relative flex items-center justify-center w-12 h-12 mt-2 hover:bg-gray-300"
           href="#">
          <i class="material-icons">{{ isSidebarOpen ? 'close' : 'menu' }}</i>
        </a>
      </div>
      <a class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 " href="#">
        <i class="material-icons">open_in_new</i>

      </a>


    </div>
  </div>
</template>

<script>
import SettingsModal from "@/components/Modal/SettingsModal.vue";

export default {
  name: 'SideBar',
  components: {SettingsModal},
  data() {
    return {
      isSidebarOpen: true,
      isSettingsModalOpen: false,
      marked: false, // for notifications
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openSettingsModal() {
      this.isSettingsModalOpen = true;
    },
    closeSettingsModal() {
      this.isSettingsModalOpen = false;
    },
  },
};
</script>

<style scoped>

</style>