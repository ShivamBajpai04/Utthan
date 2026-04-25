# Utthan NGO — Public Website

Content-driven public website for Utthan, an Indian NGO. Built as an npm workspace
monorepo with three apps:

| App        | Stack                                               | Purpose                              |
| ---------- | --------------------------------------------------- | ------------------------------------ |
| `frontend` | Next.js 15 (App Router) · React 19 · Tailwind v4   | The public site rendered to visitors |
| `backend`  | NestJS 11 · Node 20+                                | Lightweight API (health + content)   |
| `sanity`   | Sanity Studio v4                                    | CMS used by staff for content        |

The frontend fetches content directly from Sanity via `next-sanity`. The NestJS
backend is a thin, cacheable API layer (useful for non-Next consumers or future
form submissions) and is optional.

## Requirements

- Node.js **20.18+**
- npm 10+
- A free [Sanity](https://www.sanity.io/) project (Project ID + Dataset)

## Setup

```bash
# 1. Install everything
npm install

# 2. Copy env templates
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
cp sanity/.env.example sanity/.env

# 3. Fill in your Sanity Project ID in each of those files
#    (get it from https://sanity.io/manage)

# 4. Run all three apps in parallel
npm run dev
```

This starts:

- Frontend → http://localhost:3000
- Backend  → http://localhost:4000
- Studio   → http://localhost:3333

## Content model

| Schema         | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| **Project**    | Name, description, slug. Gallery photos reference projects. |
| **GalleryPhoto** | Photo with description, linked to a project. Sortable.   |
| **Blog Post**  | Cover image, title, rich-text body (Portable Text).         |
| **Author**     | Name, image, bio — referenced by blog posts.                |

Staff manage all content in **Sanity Studio**. The Studio has built-in
authentication (see [Authentication](#authentication) below).

## Routes

### Main site (example.com)

| Route                          | Page                              |
| ------------------------------ | --------------------------------- |
| `/`                            | Homepage                          |
| `/about`                       | About Us (static)                 |
| `/projects`                    | All projects                      |
| `/projects/:slug`              | Project detail + its gallery      |
| `/gallery`                     | All gallery photos (filter by project via `?project=slug`) |
| `/help`                        | How to Help (static)              |

### Blog subdomain (blog.example.com)

| Route                          | Page                              |
| ------------------------------ | --------------------------------- |
| `/` (blog subdomain)           | Blog index                        |
| `/:slug` (blog subdomain)      | Blog post with cover + rich text  |

In development, access the blog at `http://blog.localhost:3000` or directly
via `http://localhost:3000/blog`. A Next.js middleware rewrites
`blog.<host>/*` to `/blog/*` internally.

Set `NEXT_PUBLIC_BLOG_URL` (e.g. `https://blog.example.com`) in production
so the sitemap and canonical URLs resolve correctly.

### API (backend)

Prefixed under `/api/content/`:

| Endpoint                         | Description               |
| -------------------------------- | ------------------------- |
| `GET /api/content/projects`      | All projects              |
| `GET /api/content/projects/:slug`| Single project by slug    |
| `GET /api/content/gallery`       | All photos (optionally `?project=slug`) |
| `GET /api/content/blog`          | All blog posts            |
| `GET /api/content/blog/:slug`    | Single blog post by slug  |
| `GET /health`                    | Terminus health check     |

## Authentication

### Sanity Studio (CMS admin)

Sanity Studio has **built-in authentication** — no extra setup required.

- **Local development**: When you run `npm run dev:studio`, the Studio opens
  at `http://localhost:3333`. You'll be prompted to sign in with your Sanity
  account (Google, GitHub, or email).
- **Deployed Studio**: Run `npm -w utthan-sanity run deploy` to publish your
  Studio to `<project-name>.sanity.studio`. Only invited team members can
  log in.

**To invite team members:**

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Members**
4. Click **Invite member** and enter their email
5. Assign a role (Administrator, Editor, or Viewer)

Only users invited to your Sanity project can access the Studio. This
provides role-based access control out of the box.

## Common scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Run frontend, backend, and studio in parallel      |
| `npm run build`     | Build frontend and backend for production          |
| `npm run lint`      | ESLint across frontend and backend                 |
| `npm run typecheck` | `tsc --noEmit` across frontend and backend         |
| `npm run format`    | Run Prettier over the entire repo                  |
| `npm run typegen`   | Generate Sanity TypeScript types from the schema   |

## Environment variables

### Frontend (`frontend/.env.local`)

| Variable                         | Required | Notes                                          |
| -------------------------------- | -------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | yes      | Sanity project ID                              |
| `NEXT_PUBLIC_SANITY_DATASET`     |          | Defaults to `production`                       |
| `NEXT_PUBLIC_SANITY_API_VERSION` |          | Defaults to `2025-03-04`                       |
| `NEXT_PUBLIC_SITE_URL`           |          | Public site URL (sitemap/OG tags)              |
| `NEXT_PUBLIC_BLOG_URL`           |          | Blog subdomain URL (e.g. `https://blog.example.com`) |
| `NEXT_PUBLIC_API_URL`            |          | Backend URL, if a page calls it                |
| `SANITY_API_READ_TOKEN`          |          | Only needed for draft previews                 |

### Backend (`backend/.env`)

| Variable              | Required | Notes                                              |
| --------------------- | -------- | -------------------------------------------------- |
| `SANITY_PROJECT_ID`   | yes      | Same as frontend value                             |
| `SANITY_DATASET`      |          | Defaults to `production`                           |
| `SANITY_API_VERSION`  |          | Defaults to `2025-03-04`                           |
| `SANITY_USE_CDN`      |          | `true`/`false` — only used in production           |
| `PORT`                |          | Defaults to `4000`                                 |
| `FRONTEND_URL`        |          | Comma-separated CORS origins                       |

## Deployment

- **Frontend**: Vercel (recommended). Set all `NEXT_PUBLIC_*` env vars.
  Configure a `blog.example.com` subdomain to point at the same Vercel
  project. Vercel will route both domains to the same Next.js app, and the
  middleware handles the rest.
- **Backend**: Railway, Render, or any container host.
- **Studio**: `npm -w utthan-sanity run deploy` publishes to `<project>.sanity.studio`.

## License

Private — Utthan NGO.
