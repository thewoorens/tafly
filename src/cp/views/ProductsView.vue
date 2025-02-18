<template>
  <div class="p-6 bg-red-500">
    <h1 class="text-2xl font-bold">Ürünler</h1>
    <p class="mt-4">Bu, Ürünler içeriğidir.</p>
    <button class="bg-gray-950 font-bold text-white">Bana Tıkla</button>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  methods: {
    handleClick() {
      console.log('Button clicked!');
    }
  }
};
</script>

<style scoped>

</style>