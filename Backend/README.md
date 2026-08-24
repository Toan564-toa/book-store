# Book Store API

Basic REST API for a book store project.

Detailed guide:

```txt
docs/project-usage-guide.md
```

## Setup

```bash
npm install
cp .env.example .env
npm run db:refresh
npm run dev
```

Update `MONGODB_URI` in `.env` before running the API.

Useful scripts:

```bash
npm run dev
npm run db:refresh
npm run typecheck
npm run build
npm start
```

Server runs at:

```txt
http://localhost:3000
```

Swagger docs:

```txt
http://localhost:3000/api-docs
http://localhost:3000/api-docs.json
```

## Demo Accounts

```txt
Admin: admin@example.com / 123456
User:  user@example.com / 123456
```

Catalog data uses real ISBN-based book metadata and Open Library cover URLs.

## Main Modules

- Auth: `/api/auth`
- Users: `/api/users`
- Categories: `/api/categories`
- Books: `/api/books`
- Cart: `/api/cart`
- Orders: `/api/orders`
- Reviews: `/api/reviews`
- Wishlist: `/api/wishlist`
- Admin: `/api/admin`

Book images are stored as URL strings in `imageUrl`.

## Project Structure

The API is organized by feature module:

```txt
src/modules/auth
src/modules/users
src/modules/categories
src/modules/books
src/modules/cart
src/modules/orders
src/modules/reviews
src/modules/wishlist
src/modules/admin
```

Each module keeps its own controller, routes and model when needed.

The source code uses TypeScript and ES module import syntax. Production code is compiled to `dist`.
