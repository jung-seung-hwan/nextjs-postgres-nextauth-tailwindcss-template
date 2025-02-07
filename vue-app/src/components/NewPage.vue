<template>
  <div>
    <h1>새로운 페이지</h1>
    <p>이곳은 Vue 웹 컴포넌트에서 렌더링된 새로운 페이지입니다.</p>
    <p>버튼이 {{ localCount }}번 눌렸습니다.</p>
    <button @click="incrementCount">카운트 증가</button>
    <button @click="goBack">뒤로 가기</button>
  </div>
</template>

<script>
export default {
  name: "new-page",
  data() {
    return {
      localCount: 0
    };
  },
  methods: {
    incrementCount() {
      this.localCount += 1;
    },
    goBack() {
      window.dispatchEvent(new CustomEvent("navigate", { detail: { page: "landing-page" } }));
    }
  },
  mounted() {
    // ✅ React에서 전달한 count 값을 data-* 속성에서 읽기
    this.localCount = parseInt(this.$el.getAttribute("data-count")) || 0;

    // ✅ React에서 count 업데이트 이벤트 감지
    window.addEventListener("navigate", (event) => {
      if (event.detail.page === "new-page" && event.detail.count !== undefined) {
        this.localCount = event.detail.count;
      }
    });
  }
};
</script>

<style scoped>
h1 {
  color: #4fc08d;
}
button {
  padding: 10px 20px;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}
button:hover {
  background-color: #3a9b72;
}
</style>