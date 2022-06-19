<template>
  <div class="select">
    <p
      @click="select.areOptionsVisible = !select.areOptionsVisible"
      class="select__title"
    >
      {{ select.selected }}
      <svg
        :class="{ 'select-open': select.areOptionsVisible }"
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.48532 1.24264L4.24268 4.48528L1.00003 1.24264"
          stroke="#B4B4B4"
        />
      </svg>
    </p>
    <transition name="fade">
      <div v-if="select.areOptionsVisible" class="select__options">
        <p
          class="select__option"
          v-for="(option, i) in select.options"
          :key="i"
          @click="selectOption(option)"
        >
          {{ option.name }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: {
        options: [
          {
            name: "По умолчанию",
            value: "0",
          },
          {
            name: "По цене min",
            value: "1",
          },
          {
            name: "По цене max",
            value: "2",
          },
          {
            name: "По названию",
            value: "3",
          },
        ],
        selected: "По умолчанию",
        areOptionsVisible: false,
      },
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.select.selected = option.name;
      this.select.areOptionsVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 120px;
  height: 40px;
  padding: 12.5px;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  cursor: pointer;

  &__title {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.25;
    display: flex;
    align-items: center;

    color: #b4b4b4;

    svg {
      margin-left: auto;
      transition: all 0.2s;
    }
  }

  &__options {
    font-weight: 400;
    font-size: 12px;
    line-height: 1.25;
    color: #b4b4b4;
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    padding: 12.5px;
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 2;
  }

  &__option {
    position: relative;
    width: fit-content;
    &::before {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #b4b4b4;
      transform: scale(0);
      transition: all 0.2s;
    }

    &:hover {
      &:before {
        transform: scale(1);
      }
    }
    &:not(:last-child) {
      margin-bottom: 9px;
    }
  }

  &-open {
    transform: rotate(180deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>