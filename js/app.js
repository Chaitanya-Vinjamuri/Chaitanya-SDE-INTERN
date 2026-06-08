let tickets = getTickets();

let sidebarStatus = "";

/* Initial Data */

if (tickets.length === 0) {

    tickets = [

        {
            id: "TKT-1001",
            subject: "Login Issue",
            description: "Unable to login into portal",
            status: "Open",
            priority: "High",
            assignee: "John",
            createdAt: "07/06/2026",
            dueDate: "2026-06-15"
        },

        {
            id: "TKT-1002",
            subject: "Payment Failed",
            description: "Payment gateway error",
            status: "In Progress",
            priority: "Medium",
            assignee: "David",
            createdAt: "07/06/2026",
            dueDate: "2026-06-20"
        }

    ];

    saveTickets(tickets);
}

/* DOM References */

const modal =
    document.getElementById("ticketModal");

const viewModal =
    document.getElementById("viewModal");

/* Event Listeners */

document
    .getElementById("addTicketBtn")
    ?.addEventListener(
        "click",
        openCreateModal
    );

document
    .getElementById("closeModal")
    ?.addEventListener(
        "click",
        closeModal
    );

document
    .getElementById("ticketForm")
    ?.addEventListener(
        "submit",
        saveTicket
    );

document
    .getElementById("searchInput")
    ?.addEventListener(
        "input",
        renderTickets
    );

document
    .getElementById("statusFilter")
    ?.addEventListener(
        "change",
        renderTickets
    );

document
    .getElementById("priorityFilter")
    ?.addEventListener(
        "change",
        renderTickets
    );

/* Sidebar Filters */

document
    .getElementById("allTicketsBtn")
    ?.addEventListener("click", () => {

        sidebarStatus = "";

        renderTickets();
    });

document
    .getElementById("openTicketsBtn")
    ?.addEventListener("click", () => {

        sidebarStatus = "Open";

        renderTickets();
    });

document
    .getElementById("progressTicketsBtn")
    ?.addEventListener("click", () => {

        sidebarStatus = "In Progress";

        renderTickets();
    });

document
    .getElementById("closedTicketsBtn")
    ?.addEventListener("click", () => {

        sidebarStatus = "Closed";

        renderTickets();
    });

/* Render Tickets */

function renderTickets() {

    const container =
        document.getElementById(
            "ticketContainer"
        );

    const search =
        document.getElementById(
            "searchInput"
        )
            .value
            .toLowerCase();

    const status =
        document.getElementById(
            "statusFilter"
        ).value;

    const priority =
        document.getElementById(
            "priorityFilter"
        ).value;

    container.innerHTML = "";

    const filteredTickets =
        tickets.filter(ticket => {

            const searchMatch =

                ticket.subject
                    .toLowerCase()
                    .includes(search)

                ||

                ticket.assignee
                    .toLowerCase()
                    .includes(search)

                ||

                ticket.id
                    .toLowerCase()
                    .includes(search);

            return (

                searchMatch

                &&

                (!status ||
                    ticket.status === status)

                &&

                (!priority ||
                    ticket.priority === priority)

                &&

                (!sidebarStatus ||
                    ticket.status === sidebarStatus)

            );
        });

    if (filteredTickets.length === 0) {

        container.innerHTML = `

            <div
                class="bg-white p-8 rounded-xl text-center text-gray-500">

                No tickets found

            </div>

        `;

        renderStats();

        return;
    }

    filteredTickets.forEach(ticket => {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const dueDate =
            ticket.dueDate
                ? new Date(ticket.dueDate)
                : null;

        const overdue =

            ticket.status !== "Closed"

            &&

            dueDate

            &&

            dueDate < today;

        const statusClass =

            ticket.status === "Open"

                ? "status-open"

                : ticket.status === "In Progress"

                ? "status-progress"

                : "status-closed";

        const priorityClass =

            ticket.priority === "High"

                ? "priority-high"

                : ticket.priority === "Medium"

                ? "priority-medium"

                : "priority-low";

        container.innerHTML += `

            <div class="ticket-card">

                <div class="ticket-header">

                    <div>

                        <div class="ticket-id">

                            ${ticket.id}

                        </div>

                        <div class="ticket-subject">

                            ${ticket.subject}

                        </div>

                        <p class="text-gray-500 text-sm mt-1">

                            ${
                                ticket.description
                                    .length > 80

                                    ? ticket.description
                                        .substring(
                                            0,
                                            80
                                        ) + "..."

                                    : ticket.description
                            }

                        </p>

                    </div>

                </div>

                <div class="ticket-grid">

                    <div class="ticket-field">

                        <label>Status</label>

                        <span
                            class="badge ${statusClass}">

                            ${ticket.status}

                        </span>

                    </div>

                    <div class="ticket-field">

                        <label>Priority</label>

                        <span
                            class="badge ${priorityClass}">

                            ${ticket.priority}

                        </span>

                    </div>

                    <div class="ticket-field">

                        <label>Assignee</label>

                        <p>
                            ${ticket.assignee}
                        </p>

                    </div>

                    <div class="ticket-field">

                        <label>Created</label>

                        <p>
                            ${ticket.createdAt}
                        </p>

                    </div>

                    <div class="ticket-field">

                        <label>Due Date</label>

                        <p>

                            ${ticket.dueDate || "-"}

                            ${
                                overdue

                                    ? `<span class="overdue">
                                            Overdue
                                       </span>`

                                    : ""
                            }

                        </p>

                    </div>

                </div>

                <div class="ticket-actions">

                    <button
                        onclick="viewTicket('${ticket.id}')"
                        class="btn-view">

                        View

                    </button>

                    <button
                        onclick="editTicket('${ticket.id}')"
                        class="btn-edit">

                        Edit

                    </button>

                    <button
                        onclick="deleteTicket('${ticket.id}')"
                        class="btn-delete">

                        Delete

                    </button>

                </div>

            </div>

        `;
    });

    renderStats();
}

/* Statistics */

function renderStats() {

    document
        .getElementById("totalTickets")
        .textContent =
        tickets.length;

    document
        .getElementById("openTickets")
        .textContent =
        tickets.filter(
            t => t.status === "Open"
        ).length;

    document
        .getElementById("progressTickets")
        .textContent =
        tickets.filter(
            t => t.status === "In Progress"
        ).length;

    document
        .getElementById("closedTickets")
        .textContent =
        tickets.filter(
            t => t.status === "Closed"
        ).length;
}

/* Create Ticket */

function openCreateModal() {

    document
        .getElementById("ticketForm")
        .reset();

    document
        .getElementById("ticketId")
        .value = "";

    document
        .getElementById("modalTitle")
        .textContent =
        "Create Ticket";

    modal.classList.remove(
        "hidden"
    );
}

/* Close Modal */

function closeModal() {

    modal.classList.add(
        "hidden"
    );
}

/* Save Ticket */

function saveTicket(event) {

    event.preventDefault();

    const existingId =
        document
            .getElementById(
                "ticketId"
            ).value;

    const ticket = {

        id:
            existingId ||
            "TKT-" + Date.now(),

        createdAt:
            existingId

                ? tickets.find(
                    t => t.id === existingId
                )?.createdAt

                : new Date()
                    .toLocaleDateString(),

        subject:
            document
                .getElementById(
                    "subject"
                ).value,

        description:
            document
                .getElementById(
                    "description"
                ).value,

        assignee:
            document
                .getElementById(
                    "assignee"
                ).value,

        dueDate:
            document
                .getElementById(
                    "dueDate"
                ).value,

        status:
            document
                .getElementById(
                    "status"
                ).value,

        priority:
            document
                .getElementById(
                    "priority"
                ).value
    };

    const error =
        validateTicket(ticket);

    if (error) {

        showToast(
            "❌ " + error,
            "error"
        );

        return;
    }

    const index =
        tickets.findIndex(
            t => t.id === ticket.id
        );

    if (index > -1) {

        tickets[index] =
            ticket;

        showToast(
            "✏️ Ticket Updated Successfully"
        );

    } else {

        tickets.push(ticket);

        showToast(
            "✅ Ticket Created Successfully"
        );
    }

    saveTickets(
        tickets
    );

    renderTickets();

    closeModal();
}

/* Edit */

function editTicket(id) {

    const ticket =
        tickets.find(
            t => t.id === id
        );

    document
        .getElementById("ticketId")
        .value = ticket.id;

    document
        .getElementById("subject")
        .value = ticket.subject;

    document
        .getElementById("description")
        .value = ticket.description;

    document
        .getElementById("assignee")
        .value = ticket.assignee;

    document
        .getElementById("dueDate")
        .value = ticket.dueDate || "";

    document
        .getElementById("status")
        .value = ticket.status;

    document
        .getElementById("priority")
        .value = ticket.priority;

    document
        .getElementById("modalTitle")
        .textContent =
        "Edit Ticket";

    modal.classList.remove(
        "hidden"
    );
}

/* View */

function viewTicket(id) {

    const ticket =
        tickets.find(
            t => t.id === id
        );

    document
        .getElementById(
            "viewTicketContent"
        ).innerHTML = `

        <div class="grid grid-cols-2 gap-4">

            <div>
                <strong>ID</strong>
                <p>${ticket.id}</p>
            </div>

            <div>
                <strong>Subject</strong>
                <p>${ticket.subject}</p>
            </div>

            <div>
                <strong>Status</strong>
                <p>${ticket.status}</p>
            </div>

            <div>
                <strong>Priority</strong>
                <p>${ticket.priority}</p>
            </div>

            <div>
                <strong>Assignee</strong>
                <p>${ticket.assignee}</p>
            </div>

            <div>
                <strong>Due Date</strong>
                <p>${ticket.dueDate}</p>
            </div>

            <div class="col-span-2">
                <strong>Description</strong>
                <p>${ticket.description}</p>
            </div>

        </div>
    `;

    viewModal.classList.remove(
        "hidden"
    );
}

/* Close View */

function closeViewModal() {

    viewModal.classList.add(
        "hidden"
    );
}

/* Delete */

function deleteTicket(id) {

    if (
        !confirm(
            "Delete this ticket?"
        )
    ) {
        return;
    }

    tickets =
        tickets.filter(
            t => t.id !== id
        );

    saveTickets(
        tickets
    );

    renderTickets();

    showToast(
        "🗑️ Ticket Deleted Successfully"
    );
}

/* ESC Key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeViewModal();
        }
    }
);

renderTickets();