const fs = require("fs");
const webhook = process.env.DISCORD_WEBHOOK_URL || "";
fs.writeFileSync("env.js", "window.DISCORD_WEBHOOK = " + JSON.stringify(webhook) + ";\n");
