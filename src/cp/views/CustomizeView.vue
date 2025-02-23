<template>
  <div class="flex items-center justify-center w-full min-h-screen ">
    <div class="p-8 rounded-lg max-w-4xl w-full bg-white shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">QR Kod Ön İzleme Paneli</h1>
      <p class="text-center text-gray-600 mb-8">Aşağıdaki QR kodunu tarayarak menünüze ulaşabilirsiniz.</p>

      <div class="flex flex-col lg:flex-row items-center justify-center">
        <div class="w-full lg:w-2/4 flex justify-center items-center relative mb-8 lg:mb-0">
          <img
              src="./iphone.png"
              alt="iPhone Mockup"
              class="w-2/3 md:w-1/2 mx-auto select-nones"
          />
          <div
              @click="openMenu"
              ref="qrCodeRef"
              class="absolute hover:scale-105 hover:shadow-xl hover shadow-black shadow- transition top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          ></div>
        </div>
        <div class="w-full lg:w-2/4 flex flex-col items-center">
          <button
              @click="downloadQRCode"
              class="bg-blue-500 w-8/12 text-white p-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            QR Kodunu İndir
          </button>
          <button
              @click="downloadQRCodePDF"
              class="bg-blue-500 w-8/12 text-white p-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            QR Prototip İndir (PDF)
          </button>
          <button
              v-tooltip="'Bu özelliği kullanabilmek için ücretli plana geçmeniz gerekmektedir.'"
              disabled
              @click="downloadQRCode"
              class="bg-blue-500 w-8/12 cursor-no-drop  disabled:bg-gray-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            QR Kodunun Üzerine Logo Ekle
          </button>
          <button
              v-tooltip="'Bu özelliği kullanabilmek için ücretli plana geçmeniz gerekmektedir.'"
              disabled
              @click="downloadQRCode"
              class="bg-blue-500 w-8/12 cursor-no-drop  disabled:bg-gray-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            QR Kodun Arkaplan Rengini Değiştir
          </button>
          <button
              v-tooltip="'Bu özelliği kullanabilmek için ücretli plana geçmeniz gerekmektedir.'"
              disabled
              @click="downloadQRCode"
              class="bg-blue-500 w-8/12 cursor-no-drop disabled:bg-gray-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all mb-4"
          >
            QR Kodun Rengini Değiştir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCodeStyling from 'qr-code-styling';
import {ref, onMounted} from 'vue';
import jsPDF from 'jspdf';

export default {
  name: 'CustomizeView',
  setup: function () {
    const qrData = 'https://tafly.co/menu/' + JSON.parse(localStorage.getItem("businessInfo"))?.visitorId;
    const qrCode = ref(null);
    const qrCodeRef = ref(null);
    const qrSize = 150;

    const downloadQRCode = () => {
      qrCode.value.download({name: "qr-code", extension: "png"});
    };

    const downloadQRCodePDF = () => {
      const businessInfo = JSON.parse(localStorage.getItem("businessInfo"));
      if (!businessInfo) {
        alert("Lütfen önce işletme bilgilerini girin.");
        return;
      }

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'A4'
      });

      // Arka plan rengi
      doc.setFillColor(240, 248, 255); // Hafif mavi arka plan
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

      // Başlık
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(0, 123, 255); // Canlı mavi
      doc.text("QR Code Menu", doc.internal.pageSize.width / 2, 30, {align: 'center'});

      // QR Kodunu ortala
      const canvas = qrCodeRef.value.querySelector("canvas");
      const qrImageDataUrl = canvas.toDataURL("image/png");
      const qrSize = 120;
      const qrX = (doc.internal.pageSize.width - qrSize) / 2;
      const qrY = 45;
      doc.addImage(qrImageDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

      const textX = doc.internal.pageSize.width / 2 - 25;
      // İşletme Adı
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(33, 33, 33); // Turuncu ton
      doc.text(`${businessInfo.name}`, doc.internal.pageSize.width / 2, 175, {align: 'center'});

      // Bilgi İkonları ve Metinleri

      // Adres
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text(`${businessInfo.address}`, textX, 190);

      // Telefon
      doc.text(`${businessInfo.phone}`, textX, 200);

      // Sosyal Medya
      doc.text(`${businessInfo.social}`, textX, 210);

      // Alt Bilgi
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("Powered by https://tafly.co", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 60 , {align: 'center'});

      // Çerçeve
      doc.setDrawColor(0, 123, 255);
      doc.setLineWidth(2);
      doc.roundedRect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20, 10, 10);

      // PDF Kaydet
      doc.output('dataurlnewwindow');
      doc.save("qr-menu-(tafly.co).pdf");
    };


    const openMenu = () => {
      window.open(qrData, '_blank');
    };

    onMounted(() => {
      qrCode.value = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        data: qrData,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 10,
        },
      });
      qrCode.value.append(qrCodeRef.value);
    });

    return {
      openMenu,
      qrData,
      qrCodeRef,
      downloadQRCode,
      downloadQRCodePDF,
    };
  },
};
</script>

<style scoped>
</style>