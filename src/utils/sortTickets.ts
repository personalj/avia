import TicketInterface from "@/interfaces/ticket";

const sortTickets = (tickets: TicketInterface[], sort: string): TicketInterface[] => {
    const sortedTickets = [...tickets];
    if (sort == 'cheapest') {
        sortedTickets.sort((a, b) => a.price - b.price);
    }
    if (sort == 'fastest') {
        sortedTickets.sort((a, b) => {
            const durationA = a.segments.reduce((sum, segment) => {
                return sum + segment.duration;
            }, 0);
            const durationB = b.segments.reduce((sum, segment) => {
                return sum + segment.duration;
            }, 0);
            return durationA - durationB;
        })
    }
    return sortedTickets;
}

export default sortTickets;