<template>
  <div class="name-page">
    <h1>Vue에서 React와 데이터 교환</h1>

    <!-- ✅ React에서 받은 name 값 -->
    <p>React에서 전달된 name 값: {{ receivedName }}</p>

    <!-- ✅ Vue에서 입력하는 name -->
    <input type="text" v-model="vueName" placeholder="Vue에서 이름 입력" />
    <button @click="sendNameToReact">React로 name 전송</button>

    <!-- 메인 페이지로 돌아가는 버튼 -->
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  name: "NamePage",
  data() {
    return {
      receivedName: "", // ✅ React에서 전달된 name 값
      vueName: "" // ✅ Vue에서 입력한 name 값
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    sendNameToReact() {
      console.log("🟢 Vue에서 React로 name 값 전송:", this.vueName);
      localStorage.setItem("vue-name", this.vueName); // ✅ Vue에서 입력한 값 저장
      window.dispatchEvent(new CustomEvent("vue-name-updated", { detail: this.vueName }));
    },
    handleReactNameUpdate(event) {
      console.log("🟢 React에서 name 값 업데이트됨:", event.detail);
      this.receivedName = event.detail;
      localStorage.setItem("react-name", event.detail); // ✅ React에서 받은 값 저장
    },
    handleStorageChange(event) {
      if (event.key === "react-name") {
        console.log("🟢 localStorage에서 React의 name 값 변경 감지:", event.newValue);
        this.receivedName = event.newValue || "";
      }
    }
  },
  mounted() {
    // ✅ React에서 보낸 name 값 받기 (localStorage에서 불러오기)
    window.addEventListener("update-name", this.handleReactNameUpdate);

    const savedReactName = localStorage.getItem("react-name");
    if (savedReactName) {
      this.receivedName = savedReactName;
    }

    const savedVueName = localStorage.getItem("vue-name");
    if (savedVueName) {
      this.vueName = savedVueName;
    }

    // ✅ localStorage 변경 감지 (React에서 변경 시 Vue에서 반영)
    window.addEventListener("storage", this.handleStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener("update-name", this.handleReactNameUpdate);
    window.removeEventListener("storage", this.handleStorageChange);
  }
};
</script>


<style scoped>
.name-page {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 2em;
  color: #333;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

input {
  font-size: 1em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  font-size: 1em;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}
</style>
