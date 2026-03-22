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

  const choice = body.choice || "?";
  const timeTaken = body.time_taken_seconds ?? 0;
  const landedAt = body.landed_at || "";

  console.log("Ask Out | choice:", choice, "| time:", timeTaken + "s", "| landed:", landedAt);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ ok: true }),
  };
};
