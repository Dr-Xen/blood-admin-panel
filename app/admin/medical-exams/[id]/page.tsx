import Sidebar from "@/components/Sidebar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function MedicalExamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const exam = await prisma.medicalExam.findUnique({
    where: {
      id,
    },
    include: {
      donor: true,
    },
  });

  if (!exam) {
    notFound();
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Medical Examination Details
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6 text-gray-900">
          <h2 className="text-xl font-bold mb-4">
            Donor Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {exam.donor.fullName}</p>
            <p><strong>Mobile:</strong> {exam.donor.mobile}</p>
            <p><strong>Age:</strong> {exam.donor.age}</p>
            <p><strong>Gender:</strong> {exam.donor.gender}</p>
            <p><strong>Weight:</strong> {exam.donor.weightKg} kg</p>
            <p><strong>Donation Type:</strong> {exam.donor.donationType}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-gray-900">
          <h2 className="text-xl font-bold mb-4">
            Examination Results
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Date:</strong> {exam.donationDate}</p>
            <p><strong>Height:</strong> {exam.heightCm} cm</p>
            <p><strong>Weight:</strong> {exam.weightKg} kg</p>
            <p><strong>Haemoglobin:</strong> {exam.haemoglobin}</p>
            <p><strong>Temperature:</strong> {exam.temperature}</p>
            <p><strong>Pulse:</strong> {exam.pulse}</p>
            <p>
              <strong>Blood Pressure:</strong>{" "}
              {exam.bpSystolic}/{exam.bpDiastolic}
            </p>
            <p><strong>Final Status:</strong> {exam.finalStatus}</p>
            <p><strong>Examined By:</strong> {exam.examinedBy}</p>
            <p><strong>Blood Unit:</strong> {exam.bloodUnitNumber}</p>
            <p><strong>Bag Segment:</strong> {exam.bagSegmentNumber}</p>
            <p><strong>Volume Collected:</strong> {exam.volumeCollected} ml</p>

            <p className="col-span-2">
              <strong>Comments:</strong> {exam.comments || "-"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}