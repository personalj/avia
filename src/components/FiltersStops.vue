<template>
  <div class="filters">
    <div class="filters__title">
      {{ $t("filterStops.title") }}
    </div>
    <div 
      v-for="filter in filters" 
      :key="filter.id" 
      class="filters__item"
    >
      <label 
        class="filters__item-label" 
        :class="[ 
           stopsFilters.includes(filter.value)
           ? 'active'
           : { active: !stopsFilters.length && filter.value === 'all' }
         ]"
      >
        <input
          type="checkbox"
          class="filters__item-input"
          :checked="
            stopsFilters.length 
            ? stopsFilters.includes(filter.value)
            : filter.value == 'all'"
          @change="toggleCheck(filter.value)"
        />
        <span class="filters__item-span" />
        <span class="filters__item-text">
          {{ filter.text }}
        </span>
      </label>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FilterInterface from "@/interfaces/filter";

@Component
export default class FiltersStops extends Vue {
  @Prop({ type: Array, default: [] }) stopsFilters!: string[];

  filters: FilterInterface[] = [
    { 
      id: 1, 
      value: "all",
      text: this.$t("filterStops.all")
    },
    {
      id: 2,
      value: "0",
      text: this.$t("filterStops.withoutStops"),
    },
    {
      id: 3,
      value: "1",
      text: this.$t("filterStops.oneStop"),
    },
    {
      id: 4,
      value: "2",
      text: this.$t("filterStops.twoStops"),
    },
    {
      id: 5,
      value: "3",
      text: this.$t("filterStops.threeStops"),
    },
  ];

  clearQuery(): void {
    if (!this.stopsFilters.length) {
      this.$router.push({
        query: {
          ...this.$route.query,
          stops: undefined
        },
      })
    }
  }

  toggleCheck(value: string): void {
    if (value === "all") {
      this.$router.push({
        query: {
          ...this.$route.query,
          stops: undefined
        },
      })
      this.$emit('setStopsFilters', value);
      return;
    }
    this.$emit('setStopsFilters', value);
    const queryFilters = this.stopsFilters.join('.')
    this.$router.push({
        query: {
          ...this.$route.query,
          stops: queryFilters
        },
    })
    this.clearQuery();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars.scss";
.filters {
  @include boxShadow();
  padding: ($offset * 2) 0;
  background: $baseWhite;
  border-radius: $defaultRadius;
  &__title {
    padding: 0 ($offset * 2);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    margin-bottom: $offset;
  }
  &__item {
    &-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: $offset ($offset * 2);
      @include transition();
      &:hover {
        background: $secondaryBlue;
      }
      &.active {
        .filters__item-span {
          border-color: $baseBlue;
          &:after {
            opacity: 1;
          }
        }
      }
    }
    &-input {
      display: none;
    }
    &-span {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.125rem;
      @include transition();
      border: 1px solid $thirdlyGray;
      margin-right: $offset;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.75rem;
        height: 0.5rem;
        @include transition();
        background: url("../assets/imgs/check.svg");
        background-size: contain;
        opacity: 0;
      }
    }
    &-text {
      font-size: 0.8125rem;
    }
  }
}
</style>