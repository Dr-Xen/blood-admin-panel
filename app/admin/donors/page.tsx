import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import prisma from "@/lib/prisma";

export default async function DonorsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;

  const donors = await prisma.donor.findMany({
    where: {
      OR: [
        {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          mobile: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Donor Management
        </h1>

        <form className="mb-6">
          <input
            type="text"
            name="search"
            placeholder="Search by name, mobile, or email..."
            defaultValue={search}
            className="w-full max-w-md p-3 rounded-lg border border-gray-300 text-gray-900"
          />
        </form>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {donors.map((donor) => (
                <tr
                  key={donor.id}
                  className="border-b hover:bg-gray-50 text-gray-900"
                >
                  <td className="p-4 font-medium">
                    {donor.fullName}
                  </td>

                  <td className="p-4">
                    {donor.mobile}
                  </td>

                  <td className="p-4">
                    {donor.age}
                  </td>

                  <td className="p-4">
                    {donor.gender}
                  </td>

                  <td className="p-4">
                    {donor.eligibilityStatus === "FIT" ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        FIT
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                        DEFERRED
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/donors/${donor.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}