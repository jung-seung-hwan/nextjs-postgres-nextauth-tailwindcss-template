<template>
  <div class="another-page">
    <h1>Welcome to Another Page</h1>

    <!-- ✅ React에서 받은 count 값 -->
    <p>React에서 전달된 count 값: {{ receivedCount }}</p>

    <!-- ✅ Vue에서 관리하는 count 값 -->
    <p>Vue에서 관리하는 count 값: {{ vueCount }}</p>

    <!-- ✅ Vue count 증가 버튼 -->
    <button @click="increaseVueCount">Vue에서 count 증가</button>

    <!-- 메인 페이지로 돌아가는 버튼 -->
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
export default {
  name: "AnotherPage",
  data() {
    return {
      receivedCount: 0, // ✅ React에서 전달된 count 값
      vueCount: 0, // ✅ Vue에서 자체적으로 관리하는 count 값
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    increaseVueCount() {
      this.vueCount += 1; // ✅ Vue에서 count 증가
      window.dispatchEvent(new CustomEvent("vue-count-updated", { detail: this.vueCount }));
    },
    handleReactCountUpdate(event) {
      console.log("🟢 React에서 count 값 업데이트됨:", event.detail);
      this.receivedCount = event.detail; // ✅ React에서 전달된 count 값 반영
    }
  },
  mounted() {
    // ✅ React에서 보낸 count 값 받기
    window.addEventListener("update-count", this.handleReactCountUpdate);

    // ✅ Vue count 유지 (sessionStorage 사용)
    const savedVueCount = sessionStorage.getItem("vueCount");
    if (savedVueCount !== null) {
      this.vueCount = parseInt(savedVueCount, 10);
    }
  },
  beforeDestroy() {
    // ✅ 이벤트 리스너 제거 (메모리 누수 방지)
    window.removeEventListener("update-count", this.handleReactCountUpdate);
  }
};
</script>


<style scoped>
.another-page {
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
