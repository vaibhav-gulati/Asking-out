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

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    const content = [
      "**Ask Out**",
      "Choice: " + choice,
      "Time: " + timeTaken + " seconds",
      landedAt ? "Landed: " + landedAt : "",
    ]
      .filter(Boolean)
      .join("\n");

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    });
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ ok: true }),
  };
};
