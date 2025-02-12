<template>
  <div class="setup-container">
    <h1>Selamlar</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentStep: 1,
      businessInfo: {
        name: '',
        address: '',
        phone: '',
        email: '',
        socialMedia: {
          instagram: '',
          facebook: '',
          twitter: '',
        },
      },
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    submitSetup() {
      console.log('İşletme Bilgileri:', this.businessInfo);
      this.nextStep();
    },
  },
};
</script>

<style scoped>
.setup-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.step {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369f6e;
}

.summary p {
  margin: 10px 0;
}
</style>