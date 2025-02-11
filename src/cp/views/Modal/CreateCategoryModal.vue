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
                class="mt-2 pointer w-full p-2 border rounded-lg shadow-sm file:bg-indigo-50 file:text-indigo-700 file:border-none file:py-2 file:px-4 file:rounded-lg file:hover:bg-indigo-100 transition-all"
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
import Swal from "sweetalert2";

export default {
  name: "CreateCategoryModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close-modal", "category-created"],
  setup(props, {emit}) {
    const categoryName = ref("");
    const categoryDesc = ref("");
    const categoryImage = ref(null);
    const imagePreview = ref(null);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];

      if (file) {
        categoryImage.value = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          imagePreview.value = reader.result;
        };
      }
    };

    const submitCategory = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("auth-token");

      if (!userInfo || !userInfo.id) {
        await Swal.fire({
          title: 'Hata',
          text: "Kullanıcı bilgileri bulunamadı. Lütfen giriş yapın.",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        });
        return;
      }

      if (!categoryName.value || !categoryDesc.value || !categoryImage.value) {
        await Swal.fire({
          title: 'Kategori Eklenemedi',
          text: "Lütfen tüm alanları doldurunuz!",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", categoryName.value);
      formData.append("description", categoryDesc.value);
      formData.append("ownerId", userInfo.id); // userInfo.id kullanılıyor
      formData.append("image", categoryImage.value);

      try {
        const response = await fetch("http://localhost:3000/api/post/createCategory", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`, // Token'ı header'a ekleyin
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          console.log("✅ Category created successfully:", data);
          emit("category-created"); // Yeni kategori eklendiğini bildir
          closeModal();
        } else {
          console.error("❌ Category creation error:", data.error);
          await Swal.fire({
            title: 'Kategori Eklenemedi',
            text: "Bu işlem gerçekleşirken bir hata oluştu!",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Tamam'
          }).then(() => console.log("Error: " + data.error));
        }
      } catch (error) {
        console.error("❌ Unexpected error:", error);
        await Swal.fire({
          title: 'Hata',
          text: "Kategori oluşturulurken bir hata oluştu!",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        });
      }
    };

    const closeModal = () => {
      categoryName.value = "";
      categoryDesc.value = "";
      categoryImage.value = null;
      imagePreview.value = null;

      emit("close-modal");
    };

    return {
      categoryName,
      categoryDesc,
      categoryImage,
      imagePreview,
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