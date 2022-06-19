<template>
  <div class="container">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",

  mounted() {
    this.$store.commit("items/setLocalStorage");
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  padding: 32px;
  margin: 0 auto;
}
</style>