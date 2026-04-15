export default function GroupVisitCard({ data }: any) {
  return (
    <div className="bg-white p-5 rounded shadow flex justify-between">
      <div>
        <p className="text-gray-500">Group Visits</p>
        <h2 className="text-2xl font-bold">
          {data.totalGroupVisits}
        </h2>
      </div>

      <div>
        <p className="text-gray-500">Normal Visits</p>
        <h2 className="text-2xl font-bold">
          {data.normalVisits}
        </h2>
      </div>
    </div>
  );
}