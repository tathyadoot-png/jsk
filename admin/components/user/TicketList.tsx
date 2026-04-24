export default function TicketList({ tickets, title = "Tickets" }: any) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Ticket</th>
            <th>User</th> {/* 🔥 ADD */}
            <th>Department</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((t: any) => (
            <tr key={t._id}>
              <td>{t.ticketNumber}</td>

              {/* 🔥 THIS IS WHAT YOU NEED */}
              <td>{t.userId?.name || "N/A"}</td>

              <td>{t.department}</td>

              <td>{t.status}</td>

              <td>
                {new Date(t.createdAt).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}