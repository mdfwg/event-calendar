import db from '@/lib/db';

export default async function Page() {
  // Fetch the events and their corresponding ticket packages
  const data: Array<{ event_id: number; event_name: string; date: string; location: string; package_name: string; price: number }> = await db.$queryRaw`
    SELECT e.id AS event_id, e.name AS event_name, e.date, e.location, tp.package_name, tp.price
    FROM Events e
    JOIN TicketPackages tp ON e.id = tp.event_id
    ORDER BY tp.price ASC
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Events and Ticket Packages</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Event Name</th>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Date</th>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Location</th>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Ticket Package</th>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Price</th>
              <th className="px-4 py-2 border text-gray-700 border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eventPackage) => (
              <tr key={`${eventPackage.event_id}-${eventPackage.package_name}`}>
                <td className="px-4 py-2 border text-gray-700 border-gray-300">{eventPackage.event_name}</td>
                <td className="px-4 py-2 border text-gray-700 border-gray-300">{new Date(eventPackage.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border text-gray-700 border-gray-300">{eventPackage.location}</td>
                <td className="px-4 py-2 border text-gray-700 border-gray-300">{eventPackage.package_name}</td>
                <td className="px-4 py-2 border text-gray-700 border-gray-300">{`Rp${eventPackage.price.toLocaleString()}`}</td>
                <td className="px-4 py-2 items-center border text-gray-700 border-gray-300">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Buy Ticket</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
