"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [link, setLink] = useState("");

  async function createPaste() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        ttl_seconds: ttl ? Number(ttl) : null,
        max_views: views ? Number(views) : null,
      }),
    });

    const data = await res.json();
    setLink(data.url);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Pastebin Lite
        </h1>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your paste here..."
          className="w-full border border-gray-300 rounded-md p-3 text-black resize-none"
        />

        {/* TTL */}
        <input
          type="number"
          placeholder="TTL in seconds (optional)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
          className="mt-3 w-full border border-gray-300 rounded-md p-2 text-black"
        />

        {/* Max views */}
        <input
          type="number"
          placeholder="Max views (optional)"
          value={views}
          onChange={(e) => setViews(e.target.value)}
          className="mt-3 w-full border border-gray-300 rounded-md p-2 text-black"
        />

        <button
          onClick={createPaste}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Paste
        </button>

        {link && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Your link:</p>
            <a
              href={link}
              // target="_blank"
              className="text-blue-600 break-all"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
