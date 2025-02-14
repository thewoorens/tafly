<template>
  <div class="overflow-x-auto p-6">
    <table class="w-full text-md text-left text-gray-600 shadow-md bg-white rounded-lg overflow-hidden">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        <th scope="col" class="px-6 py-3">Cihaz</th>
        <th scope="col" class="px-6 py-3">İşletim Sistemi</th>
        <th scope="col" class="px-6 py-3">Ekran Boyutu</th>
        <th scope="col" class="px-6 py-3">Tarih</th>
        <th scope="col" class="px-6 py-3">Durum</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(customer, index) in customers" :key="index"
          class="border-b hover:bg-gray-50 transition-all">
        <td class="select-all px-6 py-4 flex items-center">
          <span class="select-none material-icons text-green-500 mr-2">devices</span>
          {{ customer.device || "Cihaz belirlenemedi" }}
        </td>
        <td class="select-all px-6 py-4">{{ customer.os || "İşletim Sistemi Belirlenemedi" }}</td>
        <td class="select-all px-6 py-4">{{ customer.screenSize || "Ekran Boyutu Belirlenemedi"}}</td>
        <td class="select-all px-6 py-4">{{ customer.date || "Tarih Belirlenemedi" }}</td>
        <td class="select-all px-6 py-4">
            <span :class="statusClass(customer.status)" class="px-2 py-1 rounded-lg text-md font-semibold">
              {{ customer.status || "Durum Belirlenemedi"}}
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AllTimesTable",
  data() {
    return {
      customers: [
        {
          device: "iPhone 13",
          os: "iOS 16",
          screenSize: "6.1 inç",
          date: "2024-02-10",
          status: "Aktif"
        },
        {
          device: "Samsung Galaxy S21",
          os: "Android 12",
          screenSize: "6.2 inç",
          date: "2024-02-08",
          status: "Pasif"
        },
        {
          device: "MacBook Pro",
          os: "macOS Ventura",
          screenSize: "14 inç",
          date: "2024-02-05",
          status: "Aktif"
        }
      ]
    };
  },
  methods: {
    statusClass(status) {
      return status === "Aktif" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700";
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>