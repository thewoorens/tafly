<template>
  <div class="container mx-auto p-6">
<<<<<<< HEAD
    <h1 class="text-3xl font-bold text-gray-900 text-left mb-6">{{ $t('devicesShowingQRMenu') }}</h1>
=======
    <h1 class="text-3xl font-bold text-gray-900 text-left mb-6">{{ $t("devicesWithQRMenu") }}</h1>
>>>>>>> f755ec7a95b54c302f7e4d606d90d81d99dc0916

    <!-- Sekmeler -->
    <div class="border-b border-gray-300 overflow-x-auto pb-2">
      <ul class="flex justify-left pt-2 ml-1 gap-4 text-base font-medium text-center">
        <li v-for="tab in tabs" :key="tab">
          <button
              @click="changeTab(tab)"
              :class="['px-6 py-3 transition-all duration-200 ease-out rounded-xl',
              currentTab === tab
                ? 'text-white bg-blue-600 scale-105 shadow-md'
                : 'text-gray-800 bg-gray-200 hover:bg-gray-400 hover:scale-105']">
            {{ tab }}
          </button>
        </li>
      </ul>
    </div>


    <div class="mt-8 rounded-xl w-full text-gray-900">
      <p v-if="currentTab === 'Gerçek Zamanlı'">Gerçek zamanlı olarak QR kodu tarayan cihazlar burada listelenecek.</p>
      <div v-else-if="currentTab === 'Tüm Zamanlar'">
        <AllTimesTable/>
      </div>
      <p v-else-if="currentTab === 'Sipariş Verenler'">Sipariş veren müşterilerin listesi burada olacak.</p>
      <p v-else-if="currentTab === 'İşaretlenenler'">İşaretlenen kullanıcıların detayları burada.</p>
      <p v-else-if="currentTab === 'Ankete Katılanlar'">Anketi dolduran kullanıcılar burada.</p>
      <p v-else-if="currentTab === 'Engellenenler'">Engellenen cihazlar veya kullanıcılar burada listelenecek.</p>
    </div>
  </div>

  <div class="flex flex-wrap gap-6 justify-center mt-8">
    <div class="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
      <div class="flex items-center gap-3 mb-4">
        <i class="fas fa-chart-bar text-blue-500 text-xl"></i>
        <i class="material-icons text-3xl text-blue-500">qr_code</i>
        <h2 class="text-xl font-semibold">Günlük QR Tarama Sayıları</h2>
      </div>
      <div class="h-64">
        <canvas ref="scanChart" class="chart-canvas"></canvas>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
      <div class="flex items-center gap-3 mb-4">
        <i class="fas fa-mobile-alt text-green-500 text-xl"></i>
        <i class="material-icons text-3xl text-red-500">devices</i>
        <h2 class="text-xl font-semibold">QR Kodu Taramak İçin Kullanılan Cihazlar</h2>
      </div>
      <div class="h-64">
        <canvas ref="deviceChart" class="chart-canvas"></canvas>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
      <div class="flex items-center gap-3 mb-4">
        <i class="fas fa-laptop-code text-purple-500 text-xl"></i>
        <h2 class="text-xl font-semibold">En Yoğun Masa</h2>
      </div>
      <div class="h-64">
        <canvas ref="methodChart" class="chart-canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import AllTimesTable from "@/cp/views/tables/AllTimesTable.vue";

export default {
  name: 'StatView',
  components: {AllTimesTable},
  data() {
    return {
      currentTab: 'Tüm Zamanlar',
      tabs: [this.$t('allTime'), 'Sipariş Verenler', 'İşaretlenenler', 'Ankete Katılanlar', 'Engellenenler'],
    };
  },
  mounted() {
    this.renderScanChart();
    this.renderDeviceChart();
    this.renderMethodChart();  // Yeni grafik render'ı
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
      console.log("Aktif Sekme: " + this.currentTab);
    },
    renderScanChart() {
      const ctx = this.$refs.scanChart.getContext("2d");

      if (this.scanChart) {
        this.scanChart.destroy();
      }

      this.scanChart = new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
          datasets: [
            {
              label: "Tarama Sayısı",
              backgroundColor: "#3b82f6",
              data: [50, 75, 60, 90, 110, 800, 100],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    },
    renderDeviceChart() {
      const ctx = this.$refs.deviceChart.getContext("2d");

      if (this.deviceChart) {
        this.deviceChart.destroy();
      }

      this.deviceChart = new window.Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Mobil", "Tablet", "Bilgisayar"],
          datasets: [
            {
              backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
              data: [70, 20, 10],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    },
    renderMethodChart() {
      const ctx = this.$refs.methodChart.getContext("2d");

      if (this.methodChart) {
        this.methodChart.destroy();
      }

      this.methodChart = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
          datasets: [{
            data: [{x: 10, y: 20}, {x: 15, y: null}, {x: 20, y: 10}]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Suggested Min and Max Settings'
            }
          },
          scales: {
            y: {
              // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
              suggestedMin: 30,

              // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
              suggestedMax: 50,
            }
          }
        },
      });
    },
  },
};
</script>

<style scoped>
</style>
