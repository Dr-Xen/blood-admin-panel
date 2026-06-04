import Sidebar from "@/components/Sidebar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function DonorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const donor = await prisma.donor.findUnique({
    where: {
      id,
    },
    include: {
      medicalExam: true,
    },
  });

  if (!donor) {
    notFound();
  }

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Donor Details
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6 text-gray-900">
          <h2 className="text-xl font-bold mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {donor.fullName}</p>
            <p><strong>Father Name:</strong> {donor.fatherName}</p>
            <p><strong>Mobile:</strong> {donor.mobile}</p>
            <p><strong>Email:</strong> {donor.email}</p>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>Gender:</strong> {donor.gender}</p>
            <p><strong>Occupation:</strong> {donor.occupation}</p>
            <p><strong>Weight:</strong> {donor.weightKg} kg</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6 text-gray-900">
          <h2 className="text-xl font-bold mb-4">
            Eligibility Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Status:</strong> {donor.eligibilityStatus}
            </p>

            <p>
              <strong>Deferral Reason:</strong>{" "}
              {donor.deferralReason || "-"}
            </p>

            <p>
              <strong>Return Date:</strong>{" "}
              {donor.eligibleReturnDate || "-"}
            </p>

            <p>
              <strong>Donation Type:</strong>{" "}
              {donor.donationType}
            </p>
          </div>
        </div>

        {donor.medicalExam && (
          <div className="bg-white rounded-xl shadow p-6 text-gray-900">
            <h2 className="text-xl font-bold mb-4">
              Medical Examination
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Haemoglobin:</strong>{" "}
                {donor.medicalExam.haemoglobin}
              </p>

              <p>
                <strong>Pulse:</strong>{" "}
                {donor.medicalExam.pulse}
              </p>

              <p>
                <strong>Temperature:</strong>{" "}
                {donor.medicalExam.temperature}
              </p>

              <p>
                <strong>Blood Pressure:</strong>{" "}
                {donor.medicalExam.bpSystolic}/
                {donor.medicalExam.bpDiastolic}
              </p>

              <p>
                <strong>Examined By:</strong>{" "}
                {donor.medicalExam.examinedBy}
              </p>

              <p>
                <strong>Final Status:</strong>{" "}
                {donor.medicalExam.finalStatus}
              </p>

              <p className="col-span-2">
                <strong>Comments:</strong>{" "}
                {donor.medicalExam.comments}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}