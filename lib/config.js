export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://paste-bin-zeta.vercel.app`
    : "http://localhost:3000");
