<template>
  <v-container>
    <v-card>
      <v-card-title>Customers (Vue + Vuetify)</v-card-title>
      <v-card-text>Vuetify 2를 적용한 Vue.js 2 컴포넌트입니다.</v-card-text>
      <v-btn color="primary" @click="showAlert">Click Me</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Customers",
  methods: {
    showAlert() {
      alert("Vuetify 버튼 클릭됨!");
    }
  }
};
</script>

<style scoped>
.v-container {
  padding: 20px;
  background: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
