<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-4 text-center">
    <img :src="company.logo" alt="Logo" class="mx-auto w-24 h-24 object-cover mb-2 rounded-full" />
    <h1 class="text-2xl font-bold">{{ company.name }}</h1>
    <p class="mt-2">Adres: {{ company.address }}</p>
    <p>Telefon: {{ company.phone }}</p>
    <p>E-posta: <a :href="'mailto:' + company.email" class="text-blue-500">{{ company.email }}</a></p>
    <p v-if="company.social">Sosyal Medya: {{ company.social }}</p>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
  company: {
    type: Object,
    required: true
  }
});
</script>
