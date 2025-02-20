<template>
  <div class="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">QR Kod Yönetim Paneli</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/3 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">QR İçeriği</label>
          <input
              v-model="qrData"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Ön Plan Rengi</label>
          <input
              v-model="qrForeground"
              type="color"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Arka Plan Rengi</label>
          <input
              v-model="qrBackground"
              type="color"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Logo URL (Opsiyonel)</label>
          <input
              v-model="qrLogo"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <button
              @click="updateQRCode"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            QR Kodunu Güncelle
          </button>
        </div>
      </div>

      <div class="w-full md:w-2/3 flex justify-center items-center">
        <div class="relative">
          <img
              src="./iphone.png"
              alt="iPhone Mockup"
              class="w-full max-w-[300px] md:max-w-[400px]"
          />

          <div
              ref="qrCode"
              class="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[20vw] max-w-28 max-h-28 md:max-w-40 md:max-h-40"
          ></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import QRCodeStyling from 'qr-code-styling';

export default {
  name: 'CustomizeView',
  data() {
    return {
      qrData: 'https://example.com',
      qrSize: 200,
      qrForeground: '#000000',
      qrBackground: '#ffffff',
      qrLogo: '',
      qrCode: null,
    };
  },
  mounted() {
    this.qrCode = new QRCodeStyling({
      width: this.qrSize,
      height: this.qrSize,
      data: this.qrData,
      image: this.qrLogo,
      dotsOptions: {
        color: this.qrForeground,
        type: 'square',
      },
      backgroundOptions: {
        color: this.qrBackground,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
    });

    this.qrCode.append(this.$refs.qrCode);
  },
  methods: {
    updateQRCode() {
      this.qrCode.update({
        data: this.qrData,
        width: this.qrSize,
        height: this.qrSize,
        dotsOptions: {
          color: this.qrForeground,
        },
        backgroundOptions: {
          color: this.qrBackground,
        },
        image: this.qrLogo,
      });
    },
  },
};
</script>