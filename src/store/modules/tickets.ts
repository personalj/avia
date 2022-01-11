import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation
  } from "vuex-module-decorators";
  import Vue from 'vue';
  import store from "@/store";
  import TicketInterface from "@/interfaces/ticket";
  import { http } from "@/services/http";
  
  @Module({
    dynamic: true,
    namespaced: true,
    name: "TicketsModule",
    store,
  })
  class TicketsModule extends VuexModule {
    tickets: TicketInterface[] = [];
  
    @Mutation
    setTickets(tickets: TicketInterface[]): void {
      this.tickets = tickets;
    }

    @Action
    async getTickets(searchId: string): Promise<void> {
      try {
        const { data } = await http.get(`tickets?searchId=${searchId}`);
        this.setTickets(data.tickets)
      } catch(e) {
        Vue.$toast.open({
          message: `${e}`,
          type: 'error'
        })
      }
    }

    @Action
    async getSearchId(): Promise<string |undefined> {
      try {
        const { data } = await http.get("search");
        return data.searchId;
      }catch(e) {
        Vue.$toast.open({
          message: `${e}`,
          type: 'error'
        })
      }
    }
  
    get ticketsList() {
      return this.tickets;
    }

  }
  
  export default getModule(TicketsModule);