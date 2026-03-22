exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFY_EMAIL;

  if (!apiKey || !toEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing RESEND_API_KEY or NOTIFY_EMAIL in env" }),
    };
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
  const subject = "Ask Out – She clicked " + choice + " (" + timeTaken + "s)";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ask Out <onboarding@resend.dev>",
      to: [toEmail],
      subject: subject,
      html: [
        "<h2>Ask Out update</h2>",
        "<p><b>Choice:</b> " + choice + "</p>",
        "<p><b>Time:</b> " + timeTaken + " seconds</p>",
        landedAt ? "<p><b>Landed:</b> " + landedAt + "</p>" : "",
      ].join(""),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return { statusCode: 502, body: "Resend error: " + err };
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
