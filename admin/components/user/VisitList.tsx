// components/user/VisitList.tsx

export default function VisitList({ visits }: any) {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Visits</h2>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Purpose</th>
            <th>Meet</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {visits.map((v: any) => (
            <tr key={v._id}>
              <td>{v.purpose}</td>
              <td>{v.meetPerson}</td>
              <td>{v.status}</td>
              <td>
                {new Date(v.createdAt).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}