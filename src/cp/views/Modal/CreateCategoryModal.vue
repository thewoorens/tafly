<template>
  <div>
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold text-gray-800">Kategori Oluştur</h1>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitCategory" class="space-y-5">
          <div>
            <label for="category-name" class="block text-sm font-medium text-gray-700">Kategori Adı</label>
            <input
                v-model="categoryName"
                type="text"
                id="category-name"
                class="mt-2 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Kategori adı girin"
                required
            />
          </div>

          <div>
            <label for="category-desc" class="block text-sm font-medium text-gray-700">Kategori Açıklaması</label>
            <textarea
                v-model="categoryDesc"
                id="category-desc"
                rows="3"
                class="mt-2 w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Kategoriniz hakkında kısa bir açıklama ekleyin"
                required
            ></textarea>
          </div>

          <!-- Kategori Resmi -->
          <div>
            <label for="category-image" class="block text-sm font-medium text-gray-700">Kategori Resmi</label>
            <input
                type="file"
                id="category-image"
                @change="handleFileUpload"
                accept="image/*"
                class="mt-2 w-full p-2 border rounded-lg shadow-sm file:bg-indigo-50 file:text-indigo-700 file:border-none file:py-2 file:px-4 file:rounded-lg file:hover:bg-indigo-100 transition-all"
                required
            />
          </div>

          <!-- Resim Önizleme -->
          <div v-if="imagePreview" class="mt-4 text-center">
            <p class="text-sm text-gray-600 mb-2">Önizleme:</p>
            <img :src="imagePreview" alt="Kategori Resmi"
                 class="w-40 h-40 mx-auto object-cover rounded-lg shadow-md transition-all">
          </div>

          <!-- Gönder Butonu -->
          <div>
            <button
                type="submit"
                class="w-full p-3 rounded-lg shadow-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all"
            >
              Kategoriyi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import CryptoJS from "crypto-js";

export default {
  name: "CreateCategoryModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-modal", "category-created"],
  created() {
    console.log("ID=>>>>>>>>", JSON.parse(localStorage.getItem("userInfo")).id);
  },
  setup(props, {emit}) {
    const categoryName = ref("");
    const categoryDesc = ref("");
    const categoryImage = ref(null);
    const imagePreview = ref(null);
    const base64Hash = ref("");

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (file) {
        categoryImage.value = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result;
          base64Hash.value = CryptoJS.SHA256(base64).toString(CryptoJS.enc.Hex);
          imagePreview.value = base64;
        };
      }
    };

    const submitCategory = () => {
      if (!categoryName.value || !categoryDesc.value || !base64Hash.value) {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }

      const categoryData = {
        name: categoryName.value,
        description: categoryDesc.value,
        image: base64Hash.value,
        ownerId: JSON.parse(localStorage.getItem("userInfo")).id
      };

      console.log("📤 Sending Category Data:", categoryData);

      fetch("http://localhost:3000/api/post/createCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("✅ Category created successfully:", data);
              alert("Kategori başarıyla oluşturuldu!");
              emit("category-created"); // Yeni kategori eklendiğinde parent component'i bilgilendir
              closeModal();
            } else {
              console.error("❌ Category creation error:", data.error);
              alert("Kategori oluşturulurken bir hata oluştu: " + data.error);
            }
          })
          .catch((error) => {
            console.error("❌ Unexpected error:", error);
            alert("Kategori oluşturulurken bir hata oluştu!");
          });
    };

    const closeModal = () => {
      // Formu sıfırla
      categoryName.value = "";
      categoryDesc.value = "";
      categoryImage.value = null;
      base64Hash.value = "";
      imagePreview.value = null;

      // Modal'ı kapat
      emit("close-modal");
    };

    return {
      categoryName,
      categoryDesc,
      categoryImage,
      imagePreview,
      base64Hash,
      handleFileUpload,
      submitCategory,
      closeModal,
    };
  },
};
</script>

<style scoped>
/* Hafif animasyonlar */
input,
textarea,
button {
  transition: all 0.3s ease-in-out;
}

input:focus,
textarea:focus {
  transform: scale(1.02);
}
</style>