<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Kategori Ekle Butonu -->
    <button
        @click="openModal"
        class="p-3 rounded-lg shadow-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all mb-6"
    >
      Kategori Ekle
    </button>

    <!-- Kategoriler Tablosu -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori Adı</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resim</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="category in categories" :key="category.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.description }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <img
                :src="getImageUrl(category.image)"
                alt="Kategori Resmi"
                class="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-75 transition-all"
                @click="openImageModal(getImageUrl(category.image))"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- CreateCategoryModal Component'i -->
    <CreateCategoryModal :showModal="isModalOpen" @close-modal="closeModal" @category-created="fetchCategories"/>

    <!-- Resim Zoom Modal'ı -->
    <div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Resmi Büyüt</h2>
          <button @click="closeImageModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <img :src="selectedImage" alt="Büyütülmüş Resim" class="w-full h-auto rounded-lg"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import CreateCategoryModal from "./Modal/CreateCategoryModal.vue";

export default {
  name: "CategoryView",
  components: {
    CreateCategoryModal,
  },
  setup() {
    const isModalOpen = ref(false);
    const isImageModalOpen = ref(false);
    const categories = ref([]);
    const selectedImage = ref("");

    const getImageUrl = (hash) => {
      if (!hash) return "";
      return `data:image/jpg;base64,${hash}`;
    };

    const fetchCategories = async () => {
      try {
        const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;
        if (!ownerId) {
          console.error("❌ ownerId bulunamadı!");
          return;
        }

        const cachedCategories = localStorage.getItem("categories");
        if (cachedCategories) {
          categories.value = JSON.parse(cachedCategories);
          console.log("✅ Kategoriler cache'den yüklendi!");
          return;
        }

        const response = await fetch(`http://localhost:3000/api/get/categories?ownerId=${ownerId}`);
        const data = await response.json();

        if (data.success) {
          categories.value = data.data;
          localStorage.setItem("categories", JSON.stringify(data.data)); // Cache'e kaydet
        } else {
          console.error("❌ Kategoriler yüklenirken hata oluştu:", data.error);
        }
      } catch (error) {
        console.error("❌ Kategoriler yüklenirken beklenmeyen bir hata oluştu:", error);
      }
    };


    // Modal'ı açma
    const openModal = () => {
      isModalOpen.value = true;
    };

    // Modal'ı kapatma
    const closeModal = () => {
      isModalOpen.value = false;
    };

    // Resim modal'ını açma
    const openImageModal = (imageUrl) => {
      selectedImage.value = imageUrl;
      isImageModalOpen.value = true;
    };

    // Resim modal'ını kapatma
    const closeImageModal = () => {
      isImageModalOpen.value = false;
      selectedImage.value = "";
    };

    // Component yüklendiğinde kategorileri çek
    onMounted(() => {
      fetchCategories();
    });

    return {
      isModalOpen,
      isImageModalOpen,
      categories,
      selectedImage,
      getImageUrl,
      openModal,
      closeModal,
      openImageModal,
      closeImageModal,
      fetchCategories,
    };
  },
};
</script>

<style scoped>
/* Tablo stilleri */
table {
  width: 100%;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
}

th {
  background-color: #f9fafb;
}

/* Resim zoom efekti */
img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}
</style>