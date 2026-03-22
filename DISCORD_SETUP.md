# Discord notifications setup (using env vars)

1. Create a Discord server (or use an existing one).

2. Create a channel (e.g. `# ask-out`).

3. **Edit channel** → Integrations → Webhooks → New Webhook.

4. Copy the **Webhook URL**.

5. In **Netlify** → your site → Site configuration → Environment variables, add:
   - **Key:** `DISCORD_WEBHOOK_URL`
   - **Value:** your webhook URL

6. Trigger a new deploy.

7. When she clicks Yes or No, you'll get a message in that Discord channel.

**Local dev:** `env.js` is created with an empty webhook by default. Run `node build-env.js` before serving if you want to test with a real URL (set `DISCORD_WEBHOOK_URL` in your shell first).
