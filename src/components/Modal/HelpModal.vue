<template >
  <transition name="fade">
    <div
        v-if="isOpen"
        @click.self="closeModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-6"
    >
      <transition name="slide">
        <div @click.stop class="bg-white rounded-xl overflow-auto shadow-2xl w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-8 relative max-h-[90vh]">
          <!-- Kapatma Butonu -->
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-red-500">
            <span class="material-icons text-3xl">close</span>
          </button>

          <!-- Başlık ve Açıklama -->
          <h1 class="font-bold text-2xl">Merhaba sayın kullanıcımız,</h1>
          <p class="mt-4">Tafly, sektör fark etmeksizin QR kod menüleri oluşturmanızı sağlayan kolay, hızlı ve yapay
            zeka destekli bir sistemdir. İster bir restoran, kafe, otel, hastane, mağaza, spor salonu veya kuaför olun,
            Tafly tam size göre!</p>
          <p class="mt-2">Kullanıcı dostu arayüzü ve yapay zeka özelliği sayesinde menünüzü kolayca düzenleyebilir, tek
            tıkla QR kodunuzu oluşturup anında paylaşabilirsiniz. Yapay zeka destekli menü optimizasyonu ile ürün
            isimlendirme, açıklama önerileri ve menü kategorilendirme gibi özelliklerle işinizi daha da
            kolaylaştırıyoruz. Ayrıca, dil çevirisi ve çoklu dil desteği ile menünüzü global hale getirebilirsiniz.</p>
          <p class="mt-2">Özelleştirilebilir QR kodlar ve tasarımlar ile markanızı ön plana çıkarın. Logo ekleme, renk
            ayarlama ve farklı temalarla menünüzü tamamen kişiselleştirebilirsiniz. Gelişmiş analitik ve geri bildirim
            sistemi sayesinde hangi ürünlerin daha çok ilgi gördüğünü, sipariş yoğunluklarını ve müşteri geri
            bildirimlerini takip edebilirsiniz.</p>
          <p class="mt-2">Esnek abonelik planlarımızla, ücretsiz temel planımızı deneyebilir veya premium paketlerimizle
            ekstra özelleştirme ve reklamsız deneyim elde edebilirsiniz. Tafly ile işinizi bir adım öteye taşıyın!</p>

   <!-- Butonlar -->
<div class="flex flex-col md:flex-row gap-4 mt-6">
  <!-- Mail Gönderme Butonu -->
  <a href="https://kernelsoftware.com.tr/" target="_blank"
     class="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
    <span class="material-icons">email</span>
    <span>Bize Ulaşın</span>
  </a>

  <!-- Sunucu Durumu Butonu -->
  <a href="https://kernelsoftware.com.tr/" target="_blank"
     class="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
    <span class="material-icons">cloud</span>
    <span>Sunucu Durumu</span>
  </a>

  <!-- Kullanım Kılavuzu Butonu -->
  <a href="https://kernelsoftware.com.tr/" target="_blank"
     class="flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
    <span class="material-icons">menu_book</span>
    <span>Kullanım Kılavuzu</span>
  </a>
</div>

          <!-- Alt Bilgi -->
          <div class="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-200">
            <a href="https://kernelsoftware.com.tr" target="_blank" class="text-blue-600 font-medium select-none">
              kernelsoftware tarafından geliştirildi
            </a>
            <span class="">- Tafly v1.0.0</span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import {watch} from 'vue';

export default {
  name: 'HelpModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, {emit}) {

    watch(
        () => props.isOpen,
        (newVal) => {
          if (newVal) {
            console.log();
          }
        }
    );

    const closeModal = () => {
      emit('close');
    };

    return {
      closeModal,
    };
  },
};
</script>
<style scoped>

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>