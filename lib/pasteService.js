import { redis } from "@/lib/redis";

export async function getPasteById(id, { decrementViews = false } = {}) {
  const key = `paste:${id}`;
  const paste = await redis.hgetall(key);

  if (!paste || !paste.content) {
    return null;
  }

  // TTL
  if (paste.expiresAt && Date.now() > Number(paste.expiresAt)) {
    return null;
  }

  // View limit
  if (paste.remainingViews != null) {
    let views = Number(paste.remainingViews);
    if (views <= 0) {
      return null;
    }
    if (decrementViews) {
      await redis.hincrby(key, "remainingViews", -1);
      views -= 1;
    }
    paste.remainingViews = views;
  }

  return paste;
}
