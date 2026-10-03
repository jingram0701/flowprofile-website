# Flow Profile website — setup and how-to guide

This folder is a complete, ready-to-publish website for Flow Profile. It has no build step and no dependencies: it is plain HTML, CSS and a little JavaScript, with your logo files already in place. That makes it cheap (free on Vercel's Hobby plan), fast, and easy to edit in a browser.

**What you'll end up with:** a live site at an address like `https://flowprofile.vercel.app`, that you can later point your own domain at (for example `flowprofile.com.au`). Every time you change a file on GitHub, Vercel republishes the site within about a minute.

Total time for first setup: about 30 minutes.

---

## Contents

1. [What's in this folder](#1-whats-in-this-folder)
2. [Before you publish: put in your details](#2-before-you-publish-put-in-your-details)
3. [GitHub: create an account and upload the site](#3-github-create-an-account-and-upload-the-site)
4. [Vercel: publish the site](#4-vercel-publish-the-site)
5. [Make the contact form deliver email (Formspree)](#5-make-the-contact-form-deliver-email-formspree)
6. [Editing the site after it's live](#6-editing-the-site-after-its-live)
7. [Adding your own project photos](#7-adding-your-own-project-photos)
8. [Connecting your own domain](#8-connecting-your-own-domain)
9. [Troubleshooting](#9-troubleshooting)
10. [Glossary](#10-glossary)

---

## 1. What's in this folder

| File / folder | What it is | Will you edit it? |
|---|---|---|
| `config.js` | Your phone, email, ABN, licence, service area, social links, Formspree ID | Already filled in; edit if anything changes |
| `index.html` | The page itself: all the words, sections and captions | Yes, when you want to change wording |
| `styles.css` | Colours, fonts, spacing | Rarely |
| `script.js` | Fills in your details, runs the menu and the form | No |
| `images/` | Logo files (from the logo package) and `projects/` photos | Yes, to swap in photos |
| `favicon*.png`, `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` | Browser-tab and phone-home-screen icons | No |
| `site.webmanifest`, `robots.txt`, `vercel.json` | Small settings files for browsers, Google and Vercel | No |
| `.gitignore` | Tells GitHub to ignore junk files from your computer | No |
| `README.md` | This guide | No |

---

## 2. Before you publish: put in your details

Open `config.js` in any text editor (Notepad on Windows, TextEdit on Mac, or just do it on GitHub later in step 6). You'll see this:

```js
phoneDisplay: "0409 421 919",
phoneDial: "0409421919",
email: "brent@flowprofileplumbing.com",
serviceArea: "Melbourne and the south-east suburbs",
abn: "30 159 400 896",
licence: "Plumbing licence no. 104448",
```

Change the text **between the quotes**. Keep the quotes and the comma at the end of each line. Save the file.

That's enough to go live. The wording in `index.html` is written for a roofing, cladding and plumbing business and reads fine as-is; you can change it any time (step 6).

> **Tip for Mac users:** TextEdit sometimes turns straight quotes `"` into curly quotes `“ ”`, which breaks the file. In TextEdit go to **Format → Make Plain Text** before editing, or use a free code editor like [VS Code](https://code.visualstudio.com).

---

## 3. GitHub: create an account and upload the site

**What GitHub is:** a website that stores your files and keeps a history of every change. Vercel reads your site from there. You don't need to install anything or use the command line.

### 3.1 Create an account

1. Go to [github.com](https://github.com) and click **Sign up**.
2. Use your business email. Pick a username (for example `flowprofile`). The free plan is all you need.
3. Verify your email when the confirmation arrives.

### 3.2 Create a repository

A *repository* (repo) is just a folder on GitHub.

1. Once logged in, click the **+** in the top-right corner, then **New repository**.
2. Repository name: `flowprofile-website`
3. Description: `Flow Profile business website` (optional)
4. Choose **Public** or **Private**. Either works with Vercel. Private hides your code from the public; the live website is visible to everyone regardless.
5. Leave every checkbox unticked (no README, no .gitignore, no licence).
6. Click **Create repository**.

### 3.3 Upload the files

1. On the empty repository page, click the link **uploading an existing file** (it's in the sentence "…or **uploading an existing file**").
2. On your computer, open the `flowprofile-website` folder. Select **everything inside it** (not the folder itself): `index.html`, `config.js`, the `images` folder, and so on. Drag them all onto the GitHub upload area.
   - Dragging the whole folder in one go works in Chrome and Edge. If subfolders don't come through, drag the `images` folder separately after the first upload finishes.
   - The `.gitignore` file is hidden on Mac and Linux. It's not essential; skip it if you can't see it.
3. Wait until every file shows a green tick.
4. In the box at the bottom labelled **Commit changes**, type `First version of the site` and click **Commit changes**.

Your files are now on GitHub. You should see `index.html`, `config.js`, `images/` and the rest listed on the repository page.

---

## 4. Vercel: publish the site

**What Vercel is:** a hosting service that takes the files from GitHub and serves them to the world on fast servers, free for personal and small-business sites.

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**.
2. Choose **Continue with GitHub**. Approve the connection when GitHub asks. Pick the **Hobby** plan (free).
3. You'll land on the Vercel dashboard. Click **Add New…** → **Project**.
4. Under **Import Git Repository** you should see `flowprofile-website`. Click **Import** next to it.
   - If it isn't listed, click **Adjust GitHub App Permissions**, grant Vercel access to that repository, and come back.
5. On the configure screen, leave everything as it is:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build and Output Settings: leave blank
6. Click **Deploy**.
7. After about 30 seconds you'll see confetti and a preview of your site. Click **Continue to Dashboard**, then **Visit** to open it.

Your site is live at an address like `https://flowprofile-website.vercel.app`.

**Make the address nicer (optional):** in the Vercel project, go to **Settings → Domains**, click **Edit** next to the `.vercel.app` address and change it to something short like `flowprofile.vercel.app` if it's available.

**Last step:** put that address into `config.js` as `siteUrl` (see step 6 for how to edit on GitHub). It's used for link previews when someone shares your site.

---

## 5. Make the contact form deliver email (Formspree)

The site has no server, so it needs a small free service to turn form submissions into emails. Until you set this up, the form still works: it opens the visitor's own email app with the message pre-filled, addressed to the email in `config.js`.

1. Go to [formspree.io](https://formspree.io) and sign up (free plan: 50 messages a month).
2. Click **New form**. Name it `Flow Profile quotes`. For the email, enter the address you want enquiries sent to. Click **Create form**.
3. Formspree shows an endpoint like `https://formspree.io/f/xabcdefg`. The last part (`xabcdefg`) is your form ID.
4. In `config.js`, set `formspreeId: "xabcdefg"` (your ID, inside the quotes).
5. Commit the change on GitHub (step 6). Vercel republishes automatically.
6. Send yourself a test message from the live site. The first time, Formspree emails you a confirmation link to activate the form. Click it.

Spam protection is built in (a hidden field that bots fill and people don't).

---

## 6. Editing the site after it's live

You can do everything from the GitHub website. The flow is always the same: **open the file → pencil icon → change → Commit changes**. Vercel notices the commit and republishes within about a minute. No need to touch Vercel again.

### 6.1 Change your details (phone, email, etc.)

1. On GitHub, open your repository and click `config.js`.
2. Click the **pencil icon** (top-right of the file, "Edit this file").
3. Change the text between the quotes.
4. Click the green **Commit changes…** button, optionally type a note like `Updated phone number`, click **Commit changes** again.

### 6.2 Change wording on the page

1. Open `index.html` and click the pencil icon.
2. Press **Ctrl+F** (Windows) or **Cmd+F** (Mac) and search for the sentence you want to change.
3. Edit the text only. Leave anything inside angle brackets `< >` alone: those are the tags that give the page its structure.
4. Commit as above.

Things you might want to change in `index.html`:

- **Headline** – search for `Metal roofing, cladding and plumbing, done properly.`
- **Service descriptions and bullet points** – inside `<section class="section" id="services">`
- **About paragraph** – inside `<section … id="about">`, marked with a comment telling you to edit it
- **Photo captions** – the `<figcaption>` lines in the Projects section
- **Page title and Google description** – the `<title>` and `<meta name="description">` lines at the top

Lines starting with `<!--` and ending with `-->` are notes to you; they don't appear on the site.

### 6.3 Undo a mistake

Every commit is saved. On the repository page click **Commits** (or the clock icon), find the version that was fine, click **<>** (Browse files) next to it, open the file, copy the good content, and paste it over the broken one. Or, if the site stopped working entirely, Vercel also keeps every deployment: in Vercel go to **Deployments**, find the last good one, click the **⋯** menu → **Promote to Production**.

### 6.4 Preview before publishing (optional)

If you want to check a change before it goes live, make the edit on a *branch*: in the commit dialog choose **Create a new branch for this commit and start a pull request**. Vercel builds a preview address for the branch and posts the link on the pull request. When you're happy, click **Merge pull request**. Most people skip this for small text changes.

---

## 7. Adding your own project photos

The Projects section shows six photos from `images/projects/`, named `project-1.jpg` to `project-6.jpg`. Replace the placeholder files with your own, keeping the same names, and you don't need to change any code.

1. Pick six landscape photos. Resize them to about **1600 × 1200 px** and save as JPG. Big phone photos (4000+ px, 5 MB) make the page slow; [squoosh.app](https://squoosh.app) is a free tool that resizes and compresses in the browser.
2. Rename them `project-1.jpg` … `project-6.jpg`.
3. On GitHub, open the `images` folder, then `projects`.
4. Click **Add file → Upload files**, drag the six photos in, and commit. GitHub replaces the old files because the names match.
5. Open `index.html`, find the Projects section, and update each `<figcaption>` to describe the photo. Update the `alt="…"` text too (it's read out to screen readers and used by Google).

Want more or fewer than six? Copy or delete a whole `<figure> … </figure>` block in `index.html`.

---

## 8. Connecting your own domain

If you own (or buy) `flowprofile.com.au` or similar:

1. In Vercel, open the project → **Settings → Domains** → type your domain → **Add**.
2. Vercel shows you DNS records to add. Log in to wherever you bought the domain (for example VentraIP, GoDaddy, Crazy Domains, Cloudflare) and add them:
   - For the bare domain (`flowprofile.com.au`): an **A record** pointing to the IP address Vercel shows.
   - For `www`: a **CNAME record** pointing to the value Vercel shows (usually `cname.vercel-dns.com`).
3. Wait. DNS changes take anywhere from 5 minutes to a day. Vercel's Domains page will show a green tick when it's working, and it issues the HTTPS certificate automatically.
4. Update `siteUrl` in `config.js` to the new address.

Buying a domain: any Australian registrar works. A `.com.au` requires an ABN. Expect roughly $15–30 a year.

---

## 9. Troubleshooting

**The site shows the wrong phone number or details.**
Open `config.js` on GitHub and check the values. Make sure the quotes are straight `"` not curly.

**I changed something on GitHub but the live site hasn't updated.**
Give it two minutes, then hard-refresh (Ctrl+Shift+R or Cmd+Shift+R). If it's still old, open Vercel → **Deployments**. A red "Error" means a file is broken; click it to see the message. Usually it's a missing quote or comma in `config.js`.

**Everything on the page is blank where my details should be.**
A syntax error in `config.js`. The commonest causes: a missing comma at the end of a line, a missing closing quote, or curly quotes. Compare against the original in this folder.

**The form says "That did not send".**
Check `formspreeId` is exactly the ID from Formspree (no `https://`, no `/f/`), and that you clicked the activation link Formspree emailed you.

**Photos look stretched or tiny.**
They're cropped to a 4:3 shape automatically. Use landscape photos; portrait shots will have their tops and bottoms cropped.

**The Vercel import screen doesn't show my repository.**
Click **Adjust GitHub App Permissions** on that screen and give Vercel access to `flowprofile-website`.

**I want to add a second page (for example a Terms page).**
Create `terms.html` in the repo (copy `index.html` as a starting point and strip out what you don't need). Because `vercel.json` has `cleanUrls` on, it'll be reachable at `/terms`. Link to it from the footer.

---

## 10. Glossary

- **Repository (repo):** your project's folder on GitHub.
- **Commit:** saving a change on GitHub. Each commit is a snapshot you can go back to.
- **Deploy / deployment:** Vercel taking the current files and putting them live.
- **Branch / pull request:** a way to make changes in a side copy and merge them in later. Optional for a site this size.
- **DNS:** the address book of the internet. Connecting a domain means adding a couple of entries so your domain points at Vercel.
- **Static site:** a site made of plain files with no database. Fast, secure, and free to host, which is what this is.

---

### Brand reference

Colours and type are set at the top of `styles.css`:

- Charcoal `#2B2B2B` (text, dark sections)
- Drop blue `#9BCBEB` (buttons, the drop, step markers)
- Typeface: Jost, loaded from Google Fonts

The original logo package (all PNG, SVG and PDF versions, favicon set and usage notes) should be kept somewhere safe; only the web versions are in `images/`.
