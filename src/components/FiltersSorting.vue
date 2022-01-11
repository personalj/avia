<template>
  <div class="filters-options">
    <button
      v-for="filter in filters"
      :key="filter.id"
      class="filters-options__btn"
      :class="{ active: filter.value === sorting }"
      @click="changeFilterOption(filter.value)"
    >
      <span> {{ filter.text }} </span>
    </button>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FilterInterface from "@/interfaces/filter";

@Component
export default class FiltersOptions extends Vue {
  @Prop({ type: String, default: "" }) sorting!: string;

  filters: FilterInterface[] = [
    {
      id: 1,
      value: "cheapest",
      text: this.$t("filterOptions.cheapest"),
    },
    {
      id: 2,
      value: "fastest",
      text: this.$t("filterOptions.fastest"),
    },
  ];

  changeFilterOption(value: string): void {
    this.$emit('setFilterSorting', value);
     this.$router.push({
        query: {
          ...this.$route.query,
          sorting: value
        },
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars.scss";
.filters-options {
  display: flex;
  align-items: center;
  margin-bottom: $offset * 2;
  &__btn {
    min-height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    max-width: 10.5rem;
    background: $baseWhite;
    border: 1px solid $baseGray;
    @include transition;
    &:hover,
    &.active {
      background: $baseBlue;
      span {
        color: $baseWhite;
      }
    }
    span {
      font-weight: 600;
      text-transform: uppercase;
    }
    &:first-child {
      border-right: 0;
      border-top-left-radius: $defaultRadius;
      border-bottom-left-radius: $defaultRadius;
    }
    &:last-child {
      border-top-right-radius: $defaultRadius;
      border-bottom-right-radius: $defaultRadius;
    }
  }
}
</style>