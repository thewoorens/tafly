<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ProductItem v-for="product in products" :key="product.name" :product="product" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ProductItem from './ProductItem.vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>
