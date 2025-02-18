<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
      <div class="p-6 bg-blue-600 text-white flex items-center space-x-4">
        <img :src="company.logo" alt="Company Logo" class="w-12 h-12 rounded-full"/>
        <div>
          <h2 class="text-xl font-bold">{{ company.name }}</h2>
          <p class="text-sm">{{ company.type }}</p>
        </div>
      </div>

      <div class="p-6 space-y-4">
        <div class="flex items-center space-x-3">
          <span class="material-icons text-gray-600">location_on</span>
          <p class="text-gray-700">{{ company.address }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <span class="material-icons text-gray-600">phone</span>
          <p class="text-gray-700">{{ company.phone }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <span class="material-icons text-gray-600">email</span>
          <p class="text-gray-700">{{ company.email }}</p>
        </div>

        <div class="flex items-center space-x-3">
          <span class="material-icons text-gray-600">share</span>
          <div class="flex space-x-2">
            <a v-for="(link, platform) in company.social" :key="platform" :href="link"
               class="text-blue-600 hover:text-blue-800">
              <span class="text-sm" v-tooltip.bottom="link">{{ platform }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QrMenuTabs',
  data() {
    return {
      company: {
        name: 'Acme Corp',
        address: '123 Main St, Springfield, IL',
        type: 'Technology Solutions',
        social: {
          twitter: 'https://twitter.com/acme',
          facebook: 'https://facebook.com/acme',
          linkedin: 'https://linkedin.com/company/acme',
        },
        phone: '+1 234 567 890',
        email: 'info@acme.com',
        logo: 'https://via.placeholder.com/150',
      },
    };
  },
};
</script>

<style scoped>
</style>