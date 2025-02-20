<template>
  <div>
    <div v-for="category in categories" :key="category.name" class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ category.name }}</h2>
      <ProductList :products="category.products" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ProductList from './ProductList.vue';

defineProps({
  categories: {
    type: Array,
    required: true
  }
});
</script>
