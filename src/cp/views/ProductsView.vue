<template>
  <div class="min-h-screen">

    <div class="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
      <div class="mb-12 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div class="relative w-full sm:w-72">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="Ürün ara..."
              class="w-full px-4 py-3 rounded-xl bg-white shadow-sm border-0 focus:ring-2 focus:ring-blue-500"
          >
          <span class="absolute right-3 top-3.5 text-gray-400"><i class="material-icons">search</i></span>
        </div>

        <div class="flex flex-wrap gap-2">
          <template v-if="categories && categories.length">
            <button
                v-for="category in categories"
                v-tooltip="category.description"
                :key="category.id"
                @click="activeCategory = category.id"
                :class="[
        'px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105',
        activeCategory === category.id
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
      ]"
            >
              {{ category.name }}
            </button>
          </template>
          <template v-else>
            <p class="text-gray-900">Kategori bulunamadı. Lütfen başlamak için bir
              <router-link to="/cp/category" class="text-blue-600"> Kategori oluşturun</router-link>
            </p>
          </template>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
            v-for="item in filteredMenuItems"
            :key="item.id"
            class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            @click="openModal(item)"
        >
          <div class="relative">
            <img
                :src="item.image"
                :alt="item.name"
                class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
            <div class="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold text-blue-600">
              {{ item.price }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ item.name }}</h3>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
            <button class="mt-3 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              Detayları Gör →
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click="closeModal"
    >
      <div
          class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          @click.stop
      >
        <img
            :src="selectedItem.image"
            :alt="selectedItem.name"
            class="w-full h-72 object-cover"
        >
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-3xl font-bold text-gray-900">{{ selectedItem.name }}</h2>
            <span class="text-2xl font-bold text-blue-600">{{ selectedItem.price }}</span>
          </div>
          <p class="text-gray-600 mb-6">{{ selectedItem.description }}</p>

          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Hazırlama Süresi:</span>
              <span class="font-medium">25-30 dk</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Kalori:</span>
              <span class="font-medium">{{ selectedItem.calories || '450 kcal' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Porsiyon:</span>
              <span class="font-medium">1 Kişilik</span>
            </div>
          </div>

          <div class="mt-8 flex gap-4">
            <button
                class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                @click="closeModal"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  created() {
    console.log(JSON.parse(localStorage.getItem("cachedCategories")));
  },
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      selectedItem: null,
      categories: JSON.parse(localStorage.getItem("cachedCategories")),
      menuItems: [
        {
          id: 1,
          name: 'Izgara Köfte',
          description: 'Özel baharatlarla hazırlanmış el yapımı köfte, yanında pilav ve ızgara sebzeler ile servis edilir.',
          price: '120 TL',
          category: 'main',
          calories: '650 kcal',
          image: 'https://placehold.co/600x400'
        },
        {
          id: 2,
          name: 'Mercimek Çorbası',
          description: 'Geleneksel tarif ile hazırlanan mercimek çorbası, kıtır ekmek ile servis edilir.',
          price: '45 TL',
          category: 'appetizer',
          calories: '220 kcal',
          image: 'https://placehold.co/600x400'
        },
        {
          id: 3,
          name: 'Künefe',
          description: 'Hatay usulü künefe, özel peyniri ve fıstık ile süslenerek, dondurma ile servis edilir.',
          price: '85 TL',
          category: 'dessert',
          calories: '480 kcal',
          image: 'https://placehold.co/600x400'
        },
        {
          id: 4,
          name: 'Türk Kahvesi',
          description: 'Geleneksel metotlarla hazırlanan Türk kahvesi, lokum ile servis edilir.',
          price: '30 TL',
          category: 'drinks',
          calories: '5 kcal',
          image: 'https://placehold.co/600x400'
        }
      ]
    }
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(item => {
        const matchesCategory = this.activeCategory === 'all' || item.category === this.activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    openModal(item) {
      this.selectedItem = item;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.selectedItem = null;
      document.body.style.overflow = 'auto';
    }
  }
}
</script>