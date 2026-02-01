export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getPasteById } from "@/lib/pasteService";

export default async function Page({ params }) {
  const { id } = await params;

  // DO NOT decrement views on page load
  const paste = await getPasteById(id, { decrementViews: true });

  if (!paste) notFound();

  return (
    <pre className="p-5 text-black bg-white h-screen text-center whitespace-pre-wrap">
      {paste.content}
    </pre>
  );
}
