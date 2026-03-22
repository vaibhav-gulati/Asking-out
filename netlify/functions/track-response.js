const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const choice = body.choice || "unknown";
  const timeTaken = body.time_taken_seconds ?? 0;
  const landedAt = body.landed_at || new Date().toISOString();

  const store = getStore({ name: "ask-out-responses" });
  const key = `response-${Date.now()}`;
  await store.set(key, JSON.stringify({
    choice,
    time_taken_seconds: timeTaken,
    landed_at: landedAt,
    received_at: new Date().toISOString(),
  }));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
