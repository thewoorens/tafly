<template>
  <div class="min-h-screen m flex items-center justify-center p-4">
    <div
        v-if="!isSetupCompleted"
        class="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div class="p-6">
        <div class="flex justify-between items-center relative">
          <div
              class="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 z-0"
          ></div>
          <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center z-10"
          >
            <div
                v-if="index > 0"
                :class="[
            'h-1 flex-1 mx-2 transition-all duration-300',
            currentStep >= index ? 'bg-blue-600' : 'bg-gray-200',
          ]"
            ></div>
            <div
                :class="[
            'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
            currentStep === index
              ? 'bg-blue-600 text-white scale-110'
              : 'bg-gray-200 text-gray-600',
          ]"
            >
              <span class="material-icons">{{ step.icon }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div v-if="currentStep === 0">
          <h2 class="text-2xl font-bold mb-4">Şirket Bilgileri</h2>
          <input
              v-model="companyData.name"
              type="text"
              placeholder="Şirket Adı"
              required="required"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
              v-model="companyData.address"
              type="text"
              placeholder="Şirket Adresi"
              required="required"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
              v-model="companyData.type"
              type="text"
              placeholder="Şirket Türü"
              required="required"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="currentStep === 1">
          <h2 class="text-2xl font-bold mb-4">İletişim Bilgileri</h2>
          <input
              v-model="companyData.phone"
              type="tel"
              required="required"
              placeholder="Şirket Telefon Numarası"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
              v-model="companyData.email"
              type="email"
              placeholder="Şirket E-posta Adresi"
              required="required"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
              v-model="companyData.social"
              type="text"
              placeholder="Şirket Sosyal Medya Adresleri"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="currentStep === 2">
          <h2 class="text-2xl font-bold mb-4">Şirket Logosu</h2>
          <input
              type="file"
              @change="handleLogoUpload"
              class="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
              v-if="companyData.logoPreview"
              :src="companyData.logoPreview"
              alt="Logo Preview"
              class="w-32 h-32 object-cover rounded-lg shadow"
          />
        </div>
      </div>

      <div class="p-6 border-t flex justify-between">
        <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="flex items-center bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
        >
          <span class="material-icons mr-2">arrow_back</span>
          Geri
        </button>
        <button
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          İleri
          <span class="material-icons ml-2">arrow_forward</span>
        </button>
        <button
            v-else
            id="submitButton"
            @click="submitForm"
            class="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
        >
          Gönder

          <span class="material-icons ml-2">check</span>
        </button>
      </div>
    </div>
    <div
        v-if="isSetupCompleted"
        class="text-center p-8 bg-white rounded-lg shadow-xl"
    >
      <h2 class="text-4xl font-bold mb-4">Kurulum Tamamlandı!</h2>
      <p class="text-gray-600 mb-6 max-w-md mx-auto whitespace-normal">
        Tebrikler! 🎉 Şirketiniz artık hazır. Uygulamayı yeniden başlatarak yönetim ekranına geçebilir ve işlerinizi
        kolayca yönetmeye başlayabilirsiniz. 🌟
      </p>
      <button
          @click="resetForm"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center"
      >
        <i class="material-icons mr-2">autorenew</i>
        Yeniden Başlat
      </button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';

export default {
  components: {},
  setup() {
    const triggerConfetti = () => {
      confetti({
        particleCount: 300,
        spread: 100,
        origin: {y: 0.6},
      });
    };

    const steps = [
      {icon: 'business', label: 'Şirket Bilgileri'},
      {icon: 'contact_mail', label: 'İletişim Bilgileri'},
      {icon: 'image', label: 'Şirket Logosu'},
    ];
    const currentStep = ref(0);
    const isSetupCompleted = ref(false);

    const companyData = ref({
      name: '',
      address: '',
      type: '',
      phone: '',
      email: '',
      social: '',
      logo: null,
      logoPreview: '',
      ownerId: JSON.parse(localStorage.getItem('userInfo'))?._id,
    });

    const nextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    const handleLogoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        companyData.value.logo = file;
        companyData.value.logoPreview = URL.createObjectURL(file);
      }
    };

    const resetForm = () => {
      window.location.reload();
    };

    return {
      steps,
      currentStep,
      isSetupCompleted,
      companyData,
      nextStep,
      prevStep,
      handleLogoUpload,
      resetForm,
      triggerConfetti,
    };
  },
  methods: {
    async submitForm() {
      const button = document.getElementById("submitButton");
      button.disabled = true;
      button.classList.add("opacity-50");
      try {
        console.log("gelen veri: " + JSON.stringify(this.companyData));
        const response = await this.$axios.post("http://localhost:3000/api/business/create", {
          name: this.companyData.name,
          address: this.companyData.address,
          type: this.companyData.type,
          phone: this.companyData.phone,
          email: this.companyData.email,
          social: this.companyData.social,
          logo: this.companyData.logo,
          ownerId: this.companyData.ownerId,
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
    },
  },
};
</script>


<style scoped>
</style>