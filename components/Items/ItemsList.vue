<template>
  <div class="items-list">
    <div class="items-list__select">
      <SelectComponent @select="select" />
    </div>
    <transition-group class="items-list__list" tag="div" name="list">
      <ItemComponent
        @deletItem="deletItem($event)"
        v-for="item in itemList"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemComponent from "@/components/Items/ItemComponent.vue";
import items from "@/api/productList";
export default {
  data() {
    return {
      items,
      res: [],
      selectSort: "",
      filterItems: [],
    };
  },
  computed: {
    ...mapGetters({ getItem: "items/getItem" }),
    itemList() {
      if (!this.filterItems.length) {
        this.res = [...this.items, ...this.getItem];
        return this.res;
      } else {
        return this.filterItems;
      }
    },
  },
  methods: {
    deletItem(id) {
      if (!this.filterItems.length) {
        this.items = this.items.filter((el) => el.id !== id);
        this.$store.commit("items/removeItem", id);
      } else {
        this.filterItems = this.filterItems.filter((el) => el.id !== id);
      }
    },
    select(option) {
      this.selectSort = option.value;
      switch (this.selectSort) {
        case "0": {
          this.filterItems = [];
          break;
        }
        case "1": {
          this.filterItems = this.res.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        }
        case "2": {
          this.filterItems = this.res.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        }
        case "3": {
          console.log("3");
          this.filterItems = this.res.sort((a, b) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0;
          });
          break;
        }

        default:
          break;
      }
    },
  },
  components: {
    ItemComponent,
  },
};
</script>

<style lang="scss" scoped>
.items-list {
  &__select {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.list-move {
  transition: transform 0.6s;
}

.list-leave-active {
  position: absolute;
}
</style>

