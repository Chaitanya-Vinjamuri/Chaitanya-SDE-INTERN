const STORAGE_KEY = "tickets";

function getTickets() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];
}

function saveTickets(tickets) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tickets)
    );
}