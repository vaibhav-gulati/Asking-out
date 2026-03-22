# Where to see her clicks (Netlify Forms)

Submissions use **Netlify Forms** – built into Netlify, no extra setup.

## Where to look

1. Netlify Dashboard → your site
2. In the left sidebar, open **Forms**
3. Click the **ask-out-log** form (or "Detected forms" if listed there)
4. Submissions will show: choice (yes/no1/no2/no3), time_taken_seconds, landed_at

## Email notifications

1. Site configuration → Forms → Form notifications
2. Add notification → Email
3. Add your email to receive each submission

## If no submissions appear

1. **Check the Spam tab** – Netlify may flag test clicks as spam. In Forms → ask-out-log, use the menu above the list to switch to **Spam submissions**.

2. **Form detection** – Site configuration → Forms → Usage and configuration → Form detection must be enabled.

3. **Redeploy** – After adding the form, trigger a new deploy so Netlify detects it.
