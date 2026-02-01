import { redis } from "@/lib/redis";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PastesPage() {
  // Get all paste IDs
  const ids = await redis.lrange("all_pastes", 0, 99); // latest 100

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">
          All Pastes
        </h1>

        {ids.length === 0 && (
          <p className="text-gray-500">
            No pastes created yet.
          </p>
        )}

        <ul className="space-y-3">
          {ids.map((id) => (
            <li
              key={id}
              className="border rounded-md p-3 hover:bg-gray-50"
            >
              <Link
                href={`/p/${id}`}
                className="text-blue-600 hover:underline break-all"
              >
                {id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}