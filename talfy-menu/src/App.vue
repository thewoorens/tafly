<template>
  <div class="container mx-auto p-4">
    <CompanyInfo :company="company"/>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CompanyInfo from './components/CompanyInfo.vue';
import CategoryList from './components/CategoryList.vue';

// Şirket bilgileri için ref tanımı
const company = ref({
  name: '',
  logo: '',
  address: '',
  phone: '',
  email: '',
  social: ''
});

const categories = ref([]); // Kategoriler için ref tanımı

// API'den verileri çeken fonksiyon
const fetchBusinessData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/business/get?ownerId=67b4e943a0aa6c5234302cb7');
    const data = await response.json();

    // Gelen veriye göre company objesini dolduruyoruz
    company.value = {
      name: data.business.name,
      logo: data.business.logo ? data.business.logo : 'https://via.placeholder.com/150',
      address: data.business.address,
      phone: data.business.phone,
      email: data.business.email,
      social: data.business.social
    };

    categories.value = data.categories;
  } catch (error) {
    console.error('Error fetching business data:', error);
  }
};

// Component yüklendiğinde verileri çekiyoruz
onMounted(() => {
  fetchBusinessData();
});
</script>
