<template>
  <div class="flex justify-center items-center p-4">
    <div class="bg-gray-200 shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h2 class="text-2xl font-semibold mb-4 text-center">Şube Oluştur</h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Sol Taraf -->
        <div class="space-y-4">
          <div>
            <label class="block font-medium text-gray-700">Şube Adı</label>
            <input v-model="branch.name" type="text"
                   class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200">
          </div>

          <div>
            <label class="block font-medium text-gray-700">Konum</label>
            <input v-model="branch.location" type="text"
                   class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
          </div>

          <div>
            <label class="block font-medium text-gray-700">Telefon</label>
            <input v-model="branch.phone" type="tel" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
          </div>

          <div>
            <label class="block font-medium text-gray-700">Email</label>
            <input v-model="branch.email" type="email"
                   class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
          </div>
        </div>

        <!-- Sağ Taraf -->
        <div class="space-y-4">
          <div>
            <label class="block font-medium text-gray-700">Adres</label>
            <textarea v-model="branch.address"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"></textarea>
          </div>

          <div>
            <label class="block  font-medium text-gray-700">Logo</label>
            <input type="file" class="mt-1 bg-white block w-full border-gray-300 rounded-md shadow-sm p-2">
          </div>

          <div>
            <label class="block font-medium text-gray-700">Sosyal Medya</label>
            <div class="grid grid-cols-3 gap-2">
              <input v-model="branch.social" type="url" placeholder="Twitter"
                     class="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
            </div>
          </div>
        </div>

        <!-- Buton -->
        <div class="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button id="submitButton" type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Şubeyi
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Swal from 'sweetalert2'
export default {
  name: 'BranchForm',
  setup() {
    const branchData = ref({
      name: '',
      address: '',
      social: '',
      phone: '',
      email: '',
      logo: '',
      ownerId: JSON.parse(localStorage.getItem('userInfo'))?._id,
      businessId: JSON.parse(localStorage.getItem("businessInfo"))?._id,
    });
    return {
      branch: branchData,
    }
  },
  methods: {
    async submitForm() {
      const button = document.getElementById("submitButton");
      button.disabled = true;
      button.classList.add("opacity-50");
      try {
        console.log(JSON.stringify(this.branch));
        const response = await this.$axios.post("http://localhost:3000/api/branch/create", {
          name: this.branch.name,
          address: this.branch.address,
          phone: this.branch.phone,
          email: this.branch.email,
          social: this.branch.social,
          logo: this.branch.logo,
          ownerId: this.branch.ownerId,
          businessId: this.branch.businessId,
        });

        console.log(response.data);

        await Swal.fire({
          icon: 'success',
          title: 'Başarılı!',
          text: 'Şirket bilgileriniz başarıyla kaydedildi.',
        });
        this.triggerConfetti();
        this.isSetupCompleted = true;
      } catch (error) {
        console.error(error);

        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;

          if (errorMessage === 100) {
            await Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Bu isimde bir şirket zaten kayıtlı.',
            });
            button.disabled = false;
            button.classList.remove("opacity-50");
          } else if (errorMessage === 101) {
            await Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Bu telefon numarası zaten kayıtlı.',
            });
            button.disabled = false;
            button.classList.remove("opacity-50");
          } else if (errorMessage === 102) {
            await Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Bu e-posta adresi zaten kayıtlı.',
            });
            button.disabled = false;
            button.classList.remove("opacity-50");
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Hata!',
              text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            });
            button.disabled = false;
            button.classList.remove("opacity-50");
          }
        } else {
          // Yanıt yoksa veya mesaj yoksa genel hata göster
          await Swal.fire({
            icon: 'error',
            title: 'Hata!',
            text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          });
          button.disabled = false;
          button.classList.remove("opacity-50");
        }
      }
    }
  }
};
</script>
