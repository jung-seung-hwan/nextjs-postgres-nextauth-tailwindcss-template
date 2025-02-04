<template>
  <div>
    <h2>Vue.js 2 UI</h2>
    <p>이것은 Vue.js 2에서 렌더링된 웹 컴포넌트입니다.</p>
    <button @click="count++">클릭 횟수: {{ count }}</button>
  </div>
</template>

<script>
export default {
  name: "MyVueComponent",
  data() {
    return {
      count: 0
    };
  }
};
</script>

<style scoped>
h2 {
  color: #42b983;
}
button {
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #369f72;
}
</style>
