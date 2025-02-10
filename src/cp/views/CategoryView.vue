<template>
  <div class="max-w-7xl mx-auto p-6">
    <button
        :data-tippy-content="`Yeni bir kategori ekleyin`"
        @click="openModal"
        class="p-3 pointer rounded-lg shadow-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all mb-6 flex"
    >
      <i class="material-icons align-center mr-2">add_circle</i> Kategori Ekle
    </button>

    <div v-if="categories.length === 0" class="text-center py-10">
      <p class="text-gray-600">Kategori eklenmemiş. Lütfen bir kategori ekleyin.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.id" class="bg-white shadow-lg rounded-lg p-4">
        <img
            :src="category.image"
            alt="Kategori Resmi"
            class="w-full h-40 object-cover rounded-t-lg cursor-pointer hover:opacity-75 transition-all"
            @click="openImageModal(category.image)"
        />

        <div class="p-4 flex justify-between items-center w-full">
          <div class="align-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
            <p class="text-sm text-gray-600">{{ category.description }}</p>
          </div>

          <div>
            <button
                @click="deleteCategory(category.id)"
                class="p-2 text-white font-medium bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                :data-tippy-content="`${category.name} Kategorisini Silin`"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
<!--    TODO:Editleme fonksiyonu eklenicek        <button-->
<!--                @click="deleteCategory(category.id)"-->
<!--                class="ml-2 p-2 text-white font-medium bg-orange-300 rounded-lg hover:bg-orange-400 transition-all"-->
<!--                :data-tippy-content="`${category.name} Kategorisini düzenleyin`"-->
<!--            >-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
<!--                   stroke="currentColor" class="size-6">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>-->
<!--              </svg>-->

<!--            </button>-->
          </div>
        </div>
      </div>
    </div>

    <CreateCategoryModal :showModal="isModalOpen" @close-modal="closeModal" @category-created="fetchCategories"/>

    <div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Büyütülmüş Resim</h2>
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
import {ref, onMounted, onUpdated} from "vue";
import CreateCategoryModal from "./Modal/CreateCategoryModal.vue";
import apiClient from "@/cp/apiClient";
import Swal from "sweetalert2";
import tippy from "tippy.js";

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

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      fetchCategories();
    };

    const openImageModal = (imageUrl) => {
      selectedImage.value = imageUrl;
      isImageModalOpen.value = true;
    };

    const closeImageModal = () => {
      isImageModalOpen.value = false;
      selectedImage.value = "";
    };

    const fetchCategories = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
          throw new Error("User information not found in localStorage");
        }

        const ownerId = JSON.parse(userInfo)?.id;
        if (!ownerId) {
          throw new Error("ownerId not found in userInfo");
        }

        const {data} = await apiClient.get("/categories", {ownerId});

        if (data.error === "No categories found") {
          categories.value = [];
          localStorage.removeItem("cachedCategories");
        } else {
          categories.value = data;
          localStorage.setItem("cachedCategories", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const deleteCategory = async (categoryId) => {
      try {
        const ownerId = JSON.parse(localStorage.getItem("userInfo"))?.id;
        if (!ownerId) {
          throw new Error("ownerId not found in localStorage");
        }

        const params = {id: categoryId, ownerId};

        const result = await Swal.fire({
          title: "Kategori Silmek İstediğinize Emin Misiniz?",
          text: "Silinen kategoriye bağlı tüm resimler ve ürünler de silinecek!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Evet, sil!",
          cancelButtonText: "Hayır, iptal et",
        });

        if (result.isConfirmed) {
          const {data} = await apiClient.delete("/deleteCategory", params);

          await fetchCategories();
          localStorage.setItem("cachedCategories", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        await Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Kategori silinirken bir hata oluştu: " + error.message,
        });
      }
    };

    const initTippy = () => {
      tippy("[data-tippy-content]", {
        allowHTML: true,
        interactive: true,
        theme: "material",
        placement: "bottom",
        arrow: true,
      });
    };

    onMounted(() => {
      fetchCategories();
      initTippy();

    });


    onUpdated(() => {
      initTippy();
    });

    return {
      isModalOpen,
      isImageModalOpen,
      categories,
      selectedImage,
      openModal,
      closeModal,
      openImageModal,
      closeImageModal,
      fetchCategories,
      deleteCategory,
    };
  },
};
</script>