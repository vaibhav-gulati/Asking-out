# Email setup (Resend)

1. Sign up at [resend.com](https://resend.com) (free).

2. Create an API key: **API Keys** → Create API Key → copy it.

3. In **Netlify** → your site → **Site configuration** → **Environment variables**, add:
   - `RESEND_API_KEY` = your Resend API key
   - `NOTIFY_EMAIL` = your email (e.g. `you@gmail.com`)

4. **Trigger a new deploy** so the env vars are picked up.

5. Test by clicking Yes or No on the live site.

Note: Resend uses `onboarding@resend.dev` as the sender at first. To use your own domain, add and verify it in the Resend dashboard.
