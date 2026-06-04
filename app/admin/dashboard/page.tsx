import Sidebar from "@/components/Sidebar";
import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const totalDonors = await prisma.donor.count();

  const eligibleDonors = await prisma.donor.count({
    where: {
      eligibilityStatus: "FIT",
    },
  });

  const deferredDonors = await prisma.donor.count({
    where: {
      NOT: {
        eligibilityStatus: "FIT",
      },
    },
  });

  const medicalExams = await prisma.medicalExam.count();

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Total Donors</h2>
            <p className="text-3xl font-bold mt-2">
              {totalDonors}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Eligible</h2>
            <p className="text-3xl font-bold mt-2">
              {eligibleDonors}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Deferred</h2>
            <p className="text-3xl font-bold mt-2">
              {deferredDonors}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Medical Exams</h2>
            <p className="text-3xl font-bold mt-2">
              {medicalExams}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}