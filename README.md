# Portfolio site

Plain HTML/CSS/JS — no build step, no dependencies to install.

## Before you deploy
1. Open `script.js` and edit the `CONFIG` object at the top: your GitHub username, resume filename, and email.
2. Update the `mailto:` link and GitHub URL in the Contact section of `index.html` if you used a different email.
3. Drop your resume file into this folder with the exact name set in `CONFIG.resumeFile` (default: `Vijay_Resume.pdf`).

## Deploy — GitHub Pages (free, easiest)
1. Create a new GitHub repo (e.g. `portfolio`) and push these three files (`index.html`, `style.css`, `script.js`) plus your resume PDF.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/root`.
4. Save — your site goes live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Deploy — Netlify (drag and drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this whole folder onto the page.
3. Netlify gives you a live URL immediately; you can add a custom domain later for free.

## Local preview
Just open `index.html` in a browser — no server required. The GitHub stats section needs internet access to call the GitHub API; it fails silently and shows "—" if offline.
