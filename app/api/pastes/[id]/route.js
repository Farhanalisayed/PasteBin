import { NextResponse } from "next/server";
import { getPasteById } from "@/lib/pasteService";

export async function GET(req, { params }) {
  const paste = await getPasteById(params.id, { decrementViews: true });

  if (!paste) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    content: paste.content,
    remaining_views: paste.remainingViews ?? null,
    expires_at: paste.expiresAt ? new Date(Number(paste.expiresAt)).toISOString() : null,
  });
}
