<template>
  <div
      v-if="isOpen"
      @click="closeModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
        @click.stop
        class="bg-white rounded-lg shadow-lg w-96 p-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ $t('settings.title') }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
          <i class="material-icons w-5 h-5 text-xxl">close</i>
        </button>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">{{ $t('settings.language') }}</label>
        <select
            v-model="selectedLanguage"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      <div class="flex justify-end">
        <button
            @click="saveSettings"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
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
      this.$i18n.locale = this.selectedLanguage;
      this.closeModal();
    },
  },
};
</script>