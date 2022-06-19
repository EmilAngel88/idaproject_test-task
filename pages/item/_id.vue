<template>
  <div>
    <div v-if="item" class="item-page">
      <div class="item-page__img">
        <img :src="item.imgLink" alt="product-img" />
      </div>
      <div class="item-page__info">
        <p class="item-page__name">{{ item.name }}</p>
        <p class="item-page__description">{{ item.description }}</p>
        <div class="item-page__bottom">
          <p class="item-page__price">{{ numberWithSpaces }} &#x20bd;</p>
          <nuxt-link :to="'/'" class="item-page__back"> Назад </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else class="error">
      <p>Такого товара нет</p>

      <nuxt-link :to="'/'">На главную</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import items from "@/api/productList";
export default {
  data() {
    return {
      items,
    };
  },
  computed: {
    ...mapGetters({ getItemById: "items/getItemById" }),
    item() {
      return (
        this.getItemById(+this.$route.params.id) ||
        this.items.find((el) => el.id === +this.$route.params.id)
      );
    },
    numberWithSpaces() {
      return this.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/default.scss";
.item-page {
  margin-top: 50px;
  padding: 32px;
  display: flex;
  gap: 50px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  &__img {
    width: 300px;
    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }
  }

  &__info {
    max-width: 300px;
  }

  &__name {
    @extend .card-text;

    font-size: 18px;
    font-weight: 600;
    margin-bottom: 32px;
  }

  &__description {
    @extend .card-text;

    margin-bottom: 16px;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__price {
    @extend .card-text;

    font-size: 24px;
  }

  &__back {
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

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  font-size: 20px;

  p {
    @extend .card-text;
  }

  a {
    @extend .item-page__back;

    text-decoration: none;
  }
}
</style>