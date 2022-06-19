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
@import "@/assets/scss/default.scss";
.error {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  &__content {
    text-align: center;
    h1 {
      font-size: 20px;
    }

    a {
      @extend .card-text;

      font-weight: 600;
      position: relative;
      text-decoration: none;

      &::before {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #3f3f3f;
        transform: scale(0);
        transition: all 0.2s;
      }

      &:hover {
        &:before {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
