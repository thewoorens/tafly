<template>
  <div class="border p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-bold">{{ product.name }}</h3>
    <p class="text-gray-700">{{ product.description }}</p>
    <p class="text-green-600 font-semibold">{{ product.price }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>
