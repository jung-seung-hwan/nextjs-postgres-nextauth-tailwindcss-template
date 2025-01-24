<template>
  <div id="vuejs-app" class="p-6 bg-muted/40">
    <h1 class="text-4xl font-bold text-primary">Welcome to Vue.js 2</h1>
    <p class="mt-4 text-lg text-muted-foreground">
      This section is powered by Vue.js 2 inside your Next.js app!
    </p>
    <button @click="count++" class="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-white">
      You clicked {{ count }} times
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style scoped>
#vuejs-app {
  text-align: center;
}
</style>
