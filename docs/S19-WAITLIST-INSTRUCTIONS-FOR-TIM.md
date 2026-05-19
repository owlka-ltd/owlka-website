# Owlka waitlist — set-up instructions

## What this does

Captures email addresses entered on owlka.com into a private Google Sheet that only you can see.

The website sends each signup to a Google Apps Script you publish from your own account. The Sheet lives in your Drive, not on any server I control.

You will do this once. After step 4 you send me the URL and I wire it up.

---

## Step 1: create the Sheet

1. Open https://sheets.google.com in a browser signed in to the Google account you want to own this list.
2. Click the big coloured "Blank spreadsheet" tile.
3. Click the file name top-left ("Untitled spreadsheet") and rename it to: `Owlka waitlist`.
4. In row 1, type these four headers, one per cell, in columns A to D:
   - A1: `timestamp`
   - B1: `email`
   - C1: `source`
   - D1: `referrer`
5. That's it for the Sheet. Leave it open.

---

## Step 2: paste the script

1. In the Sheet, click the `Extensions` menu (top bar, near `Help`).
2. Click `Apps Script`. A new tab opens with a code editor and a file called `Code.gs`.
3. Select everything in that file (Cmd+A) and delete it.
4. Open `src/lib/waitlist-script.gs.txt` from this repo, copy the whole file, paste it into the empty `Code.gs`.
5. Save: Cmd+S. It will ask for a project name. Type: `Owlka waitlist webhook`. Click `Rename` (or `OK`).

---

## Step 3: deploy as a web app

1. Top-right of the Apps Script editor, click the blue `Deploy` button.
2. Choose `New deployment`.
3. There is a gear icon next to "Select type" on the left. Click it, then click `Web app`.
4. Fill in:
   - Description: `Owlka waitlist` (anything works, this is just for your records).
   - Execute as: `Me (your-email@gmail.com)`.
   - Who has access: `Anyone`. (This sounds scary, but it only means "anyone with the URL can POST to this script". The URL is not published. Only owlka.com knows it.)
5. Click `Deploy`.
6. Google will ask you to authorise the script. Click `Authorise access`. Pick the same Google account. You will see a "Google hasn't verified this app" warning, click `Advanced` -> `Go to Owlka waitlist webhook (unsafe)`. This is your own script, the warning is the default for any new Apps Script. Click `Allow`.
7. A box appears with a `Web app URL`. It looks like `https://script.google.com/macros/s/AKfy.../exec`. Click the copy icon.

---

## Step 4: send me the URL

Paste the URL into our chat and say:

> set the waitlist URL

I will add it as an environment variable in Vercel and redeploy. You will not need to do anything else.

---

## Step 5: verify (once I confirm the redeploy is done)

1. Open https://owlka.com on your phone or laptop.
2. Scroll to the waitlist form (the email-capture box on the home page).
3. Type a real email you control. Submit.
4. Switch to the `Owlka waitlist` Sheet, refresh.
5. A new row should appear, with the timestamp, your email, `owlka.com` in source, and the page URL in referrer.

If it does not appear: tell me, I will check the Vercel logs and the Apps Script execution log (Apps Script editor -> `Executions` in the left sidebar).

---

## If you want to redeploy the script later

If we change the script you will need to:

1. Apps Script editor -> `Deploy` -> `Manage deployments`.
2. Click the pencil (edit) on the existing deployment.
3. Version: `New version`. Click `Deploy`.
4. The URL stays the same, no need to resend it.

If you ever create a brand-new deployment instead of editing the existing one, the URL changes and you would need to send me the new one.
