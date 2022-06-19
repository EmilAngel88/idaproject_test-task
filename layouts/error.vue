<template>
  <v-app class="error">
    <div class="error__content">
      <h1>Страница не найдена</h1>
      <NuxtLink to="/"> На главную </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  &__content {
    text-align: center;
    h1 {
      font-size: 20px;
    }
  }
}
</style>
