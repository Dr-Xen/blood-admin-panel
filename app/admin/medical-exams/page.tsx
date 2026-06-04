import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function MedicalExamsPage() {
  const exams = await prisma.medicalExam.findMany({
    include: {
      donor: true,
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
          Medical Examinations
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-4 text-left">Donor</th>
                <th className="p-4 text-left">Hb</th>
                <th className="p-4 text-left">Pulse</th>
                <th className="p-4 text-left">BP</th>
                <th className="p-4 text-left">Final Status</th>
                <th className="p-4 text-left">Examined By</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-b hover:bg-gray-50 text-gray-900"
                >
                  <td className="p-4">
                    {exam.donor.fullName}
                  </td>

                  <td className="p-4">
                    {exam.haemoglobin}
                  </td>

                  <td className="p-4">
                    {exam.pulse}
                  </td>

                  <td className="p-4">
                    {exam.bpSystolic}/{exam.bpDiastolic}
                  </td>

                  <td className="p-4">
                    {exam.finalStatus}
                  </td>

                  <td className="p-4">
                    {exam.examinedBy}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/medical-exams/${exam.id}`}
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