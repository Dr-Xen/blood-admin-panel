import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-red-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        Blood Admin
      </h1>

      <nav className="space-y-6">
        <Link
          href="/admin/dashboard"
          className="block hover:text-red-200"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/donors"
          className="block hover:text-red-200"
        >
          Donors
        </Link>

        <Link
          href="/admin/medical-exams"
          className="block hover:text-red-200"
        >
          Medical Exams
        </Link>

        <Link
          href="/admin/reports"
          className="block hover:text-red-200"
        >
          Reports
        </Link>

        <Link
          href="/admin/login"
          className="block hover:text-red-200 mt-10"
        >
          Logout
        </Link>
      </nav>
    </div>
  );
}