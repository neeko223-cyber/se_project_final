## News Explorer

News Explorer searches the last seven days of news and lets a signed-in reader save articles. The main page is `/`, and saved articles are at `/saved-news`. Sign-in, registration, and saved articles are stored in the browser for now. Search calls the News API.

## Technologies

- React 18
- React Router 7
- Vite 6
- CSS, with BEM class names
- News API (`GET /v2/everything`), through `https://news-api-proxy.up.railway.app` in a production build
- Netlify for the public site

## How to download

Install Git and Node.js 18 or newer, then clone the repository:

```bash
git clone https://github.com/neeko223-cyber/se_project_final.git
cd se_project_final
```

The app is on the `stage-1-frontend-api` branch until that branch is merged into `main`. If `main` does not contain `package.json` yet, check out the frontend branch:

```bash
git checkout stage-1-frontend-api
```

## How to start

Create a News API key at [newsapi.org](https://newsapi.org), then add it to a `.env` file in the project root:

```bash
VITE_NEWS_API_KEY=your_news_api_key
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173/. Search needs the key in `.env`. Sign-up and saved articles work without it, because those requests stay in `localStorage`.

## How to deploy

The public site is hosted on Netlify. A production build writes the static site to `dist`. `VITE_NEWS_API_KEY` is read while the site is built, so set that variable before building if search should work on the published site.

```bash
npm run build
npm run preview
```

The preview is at http://127.0.0.1:4173/.

In the Netlify site settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_NEWS_API_KEY`

`public/_redirects` sends other paths, such as `/saved-news`, back to `index.html` so React Router can open them after a refresh. Vite copies that file into `dist`.

Push the branch Netlify is watching, or deploy the `dist` folder from the Netlify dashboard. Netlify publishes the new build to the site below.

## Deployed app

https://nlnewsexplorer.netlify.app

