<template>
  <div class="app">
    <div class="container">
      <header class="app__header">
        <img src="@/assets/imgs/logo.svg" alt="logo" />
      </header>
      <main>
        <div
          v-if="!isLoading"
          class="app__content"
        >
          <aside class="app__aside">
            <filters-stops
              :stops-filters="stopsFilters"
              @setStopsFilters="setStopsFilters"
            />
          </aside>
          <div class="app__main">
            <filters-sorting
              :sorting="sorting"
              @setFilterSorting="setFilterSorting"
            />
            <tickets-list 
              :tickets="sortedTickets" 
            />
            <button 
              v-if="sortedTickets.length && sortedTickets.length >= moreLoaded"
              type="button" class="default-btn"
              @click="loadMore"
            >
              <span> {{ $t('tickets.loadMore') }} </span>
            </button>
          </div>
        </div>
        <div 
          v-else
        >
          <loader />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ticketsModule from "@/store/modules/tickets";
import TicketInterface from "@/interfaces/ticket";
import FiltersStops from "@/components/FiltersStops.vue";
import FiltersSorting from "@/components/FiltersSorting.vue";
import TicketsList from "@/components/TicketsList.vue";
import sortTickets from "@/utils/sortTickets";
import filterTickets from "@/utils/filterTickets";
import Loader from "@/components/common/Loader.vue";

@Component({
  components: {
    FiltersStops,
    FiltersSorting,
    TicketsList,
    Loader
  },
  methods: {
    sortTickets,
    filterTickets
  }
})
export default class Home extends Vue {
  isLoading = true;

  moreLoaded = 5;

  sorting = '';

  stopsFilters: string[] = [];

  get tickets(): TicketInterface[] {
    return ticketsModule.ticketsList;
  }

  get sortedTickets(): TicketInterface[] {
    let sortedTicketsList: TicketInterface[] = []
    this.stopsFilters.length ? 
      sortedTicketsList = filterTickets(this.tickets, this.stopsFilters, sortedTicketsList)
     : sortedTicketsList= this.tickets;
    if (this.sorting) {
      sortedTicketsList = sortTickets(sortedTicketsList, this.sorting);
    }
    return sortedTicketsList.slice(0, this.moreLoaded);
  }

  loadMore():void {
    this.moreLoaded += 5;
  }

  setStopsFilters(filter: string): void {
    if (this.stopsFilters.includes(filter)) {
      const index = this.stopsFilters.indexOf(filter);
      this.stopsFilters.splice(index, 1);
      return
    }
    this.stopsFilters.push(filter)
    if (filter === 'all') {
      this.stopsFilters = [];
    }
  }

  setFilterSorting(option: string): void {
    this.sorting = option;
  }

  async created(): Promise<void> {
    try {
      const searchId = await ticketsModule.getSearchId();
      if (searchId) {
        await ticketsModule.getTickets(searchId);
        this.isLoading = false;
      }
      if (this.$route.query.stops) {
        const routeQuery = this.$route.query.stops as string;
        this.stopsFilters = routeQuery.split('.');
      }
      if (this.$route.query.sorting) {
        this.sorting = this.$route.query.sorting as string;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/utils/vars.scss";
.app {
  padding: $offset * 5 0;
  &__header {
    text-align: center;
    margin-bottom: $offset * 5;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin: 0 - ($offset);
  }
  &__aside {
    width: (16rem / 49.37rem) * 100%;
    padding: 0 $offset;
    @media (max-width: 768px) {
      width: 100%;
      max-width: 22rem;
      margin-bottom: $offset * 2;
    }
  }
  &__main {
    width: (31.8rem / 49.37rem) * 100%;
    padding: 0 $offset;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>