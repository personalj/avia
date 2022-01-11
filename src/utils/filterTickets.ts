import TicketInterface from "@/interfaces/ticket";

const filterTickets = (tickets: TicketInterface[], filtesOptions: string[], sortedTickets: TicketInterface[]): TicketInterface[] => {
    const sortedTicketsList = [...sortedTickets];
    tickets.map(ticket => {
        if (filtesOptions.includes(String(ticket.segments[0].stops.length)) &&
            filtesOptions.includes(String(ticket.segments[1].stops.length))
        ) {
          sortedTicketsList.push(ticket)
        }
      });
    return sortedTicketsList;
}

export default filterTickets;