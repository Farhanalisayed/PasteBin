export function nowMs(req) {
  // Test mode ONLY for automated tests
  if (process.env.TEST_MODE === "1" && req) {
    const fakeTime = req.headers.get("x-test-now-ms");
    if (fakeTime) {
      return Number(fakeTime);
    }
  }

  // Normal real-world time
  return Date.now();
}
