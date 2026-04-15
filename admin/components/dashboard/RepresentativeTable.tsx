export default function RepresentativeTable({ data }: any) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="font-bold mb-3">Top Representatives</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Tickets</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r: any, i: number) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.mobile}</td>
              <td className="p-2 text-center font-bold">
                {r.totalTickets}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}