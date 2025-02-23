<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Üyelik Paketleri</h1>
    <p class="font-normal mb-4">Üyelik satın alarak Tafly daha etkili kullanın</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-2">Temel Paket</h2>
        <p class="text-gray-700 mb-4">Aylık: 10₺</p>
        <ul class="mb-4">
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 1
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 2
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 3
          </li>
        </ul>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Satın Al</button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-2">Standart Paket</h2>
        <p class="text-gray-700 mb-4">Aylık: 20₺</p>
        <ul class="mb-4">
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 1
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 2
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 3
          </li>
        </ul>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Satın Al</button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-2">Premium Paket</h2>
        <p class="text-gray-700 mb-4">Aylık: 30₺</p>
        <ul class="mb-4">
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 1
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 2
          </li>
          <li class="text-gray-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="color: mediumseagreen;" viewBox="0 0 24 24"
                 stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
            Özellik 3
          </li>
        </ul>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Satın Al</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackageView",
}
</script>

<style scoped>

</style>