# PocketSmart AI
Your Smart Budget & Recommendation Assistant (Flask app, ready for Vercel).

YouTube link: https://youtu.be/3ecrbQu8ngk

## Project structure
```
app.py              Flask entry point (exports `app`, used by Vercel)
routes/             Flask blueprints (home page, /api/recommend)
services/           Recommendation logic
templates/          index.html
public/             style.css, script.js (static files)
requirements.txt    Python dependencies
```

## Run locally
```
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

## Deploy to Vercel
1. Push this folder to a GitHub repo, then import it at vercel.com/new
   (no build command needed), or
2. CLI: `npm i -g vercel`, then run `vercel` inside this folder.
