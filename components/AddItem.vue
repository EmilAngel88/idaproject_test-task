<template>
  <div>
    <div class="add-item">
      <h2 class="add-item__heading">Добавление товара</h2>
    </div>
    <div class="add-item__form">
      <form @submit.prevent="addItem">
        <label>
          <p class="add-item__form_label add-item__form_label-required">
            Наименование товара
            <transition name="error" appear>
              <span class="add-item__form_error" v-if="item.errors.name">
                Это обязательное поле
              </span>
            </transition>
          </p>
          <input
            class="add-item__form_input"
            :class="{ 'add-item__form_input-error': item.errors.name }"
            v-model="item.name"
            type="text"
            placeholder="Введите наименование товара"
          />
        </label>
        <label>
          <p class="add-item__form_label">Описание товара</p>
          <textarea
            class="add-item__form_text-area"
            v-model="item.description"
            type="text"
            placeholder="Введите наименование товара"
          >
          </textarea>
        </label>
        <label>
          <p class="add-item__form_label add-item__form_label-required">
            Ссылка на изображение товара
            <transition name="error" appear>
              <span class="add-item__form_error" v-if="item.errors.imgLink">
                Это обязательное поле
              </span>
            </transition>
          </p>
          <input
            class="add-item__form_input"
            :class="{ 'add-item__form_input-error': item.errors.imgLink }"
            v-model="item.imgLink"
            type="text"
            placeholder="Введите ссылку"
          />
        </label>
        <label>
          <p class="add-item__form_label add-item__form_label-required">
            Цена товара
            <transition name="error" appear>
              <span class="add-item__form_error" v-if="item.errors.price">
                Это обязательное поле
              </span>
            </transition>
          </p>
          <input
            class="add-item__form_input"
            :class="{ 'add-item__form_input-error': item.errors.price }"
            v-model="item.price"
            type="text"
            placeholder="Введите цену"
          />
        </label>
        <button
          :class="{
            'add-item__form_btn-disabled':
              item.isItemAddedSuccessfully && isAddButtonDisable,
          }"
          class="add-item__form_btn"
          type="submit"
        >
          {{ btnText }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: "",
        description: "",
        imgLink: "",
        price: "",
        errors: {
          name: false,
          imgLink: false,
          price: false,
        },
        isItemAddedSuccessfully: true,
      },
    };
  },
  methods: {
    addItem() {
      if (!this.item.name && !this.item.errors.name) {
        this.item.errors.name = !this.item.errors.name;
        setTimeout(() => {
          this.item.errors.name = !this.item.errors.name;
        }, 2000);
      }
      if (!this.item.imgLink && !this.item.errors.imgLink) {
        this.item.errors.imgLink = !this.item.errors.imgLink;
        setTimeout(() => {
          this.item.errors.imgLink = !this.item.errors.imgLink;
        }, 2000);
      }
      if (!this.item.price && !this.item.errors.price) {
        this.item.errors.price = !this.item.errors.price;
        setTimeout(() => {
          this.item.errors.price = !this.item.errors.price;
        }, 2000);
      }

      if (this.item.name && this.item.imgLink && this.item.price) {
        const newItem = {
          id: Date.now(),
          name: this.item.name,
          description: this.item.description,
          imgLink: this.item.imgLink,
          price: this.item.price,
        };

        this.$store.commit("items/addItem", newItem);

        this.item.isItemAddedSuccessfully = !this.item.isItemAddedSuccessfully;
        setTimeout(() => {
          this.item.isItemAddedSuccessfully =
            !this.item.isItemAddedSuccessfully;
        }, 2000);

        this.item.name = "";
        this.item.description = "";
        this.item.imgLink = "";
        this.item.price = "";

        this.$emit('addNewItem')
      }
    },
  },
  computed: {
    isAddButtonDisable() {
      return this.item.name && this.item.imgLink && this.item.price
        ? false
        : true;
    },
    btnText() {
      return this.item.isItemAddedSuccessfully
        ? "Добавить товар"
        : "Товар добавлен!";
    },
  },
};
</script>

<style lang="scss" scoped>
.text-form {
  line-height: 1.25;
  color: #49485e;
}
.add-item {
  width: 332px;

  &__heading {
    @extend .text-form;

    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  &__form {
    padding: 24px;
    border-radius: 4px;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);

    &_label {
      @extend .text-form;

      font-weight: 400;
      font-size: 10px;
      margin-bottom: 4px;
      width: fit-content;

      &-required {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 1px;
          right: -5px;
          width: 4px;
          height: 4px;
          border-radius: 4px;
          background-color: #ff8484;
        }
      }
    }

    &_input {
      width: 100%;
      margin-bottom: 16px;
      padding: 10px 16px;
      border-radius: 4px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      border: none;
      outline: none;
      transition: outline 0.3s ease;

      &-error {
        outline: 1px solid #ff8484;
      }
    }

    &_error {
      position: absolute;
      left: 0;
      top: 56px;
      width: 100px;
      z-index: 2;
      color: #ff8484;
      font-weight: 400;
      font-size: 8px;
      line-height: 1.25;
    }

    &_text-area {
      @extend .add-item__form_input;
      height: 108px;
      resize: none;
    }

    &_btn {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 0;
      background-color: rgba(123, 174, 115, 1);
      color: white;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.02);
      }

      &-disabled {
        background-color: #eee;
        color: #b4b4b4;

        &:hover {
          transform: scale(1);
        }
      }
    }
  }
}

.error-enter-active,
.error-leave-active {
  transition: all 0.3s;
}
.error-enter,
.error-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>