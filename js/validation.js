function validateTicket(ticket) {

    if (!ticket.subject.trim())
        return "Subject is required";

    if (!ticket.assignee.trim())
        return "Assignee is required";

    if (!ticket.description.trim())
        return "Description is required";

    return null;
}