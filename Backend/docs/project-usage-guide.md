# Book Store API Usage Guide

Tai lieu nay huong dan cach cai dat, chay project, dung Swagger va ghep API cho project Book Store API.

## 1. Yeu Cau Moi Truong

Can cai san:

```txt
Node.js
npm
MongoDB Atlas hoac MongoDB local
```

Project dang dung:

```txt
Express
TypeScript
MongoDB + Mongoose
JWT Authentication
Swagger UI
```

## 2. Cai Dat Project

Tai thu muc project, chay:

```bash
npm install
```

Tao file `.env` tu file mau:

```bash
cp .env.example .env
```

Mo file `.env` va kiem tra cac bien:

```txt
PORT=3000
JWT_SECRET=change-this-secret
JWT_EXPIRES_IN=7d
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-store-api?retryWrites=true&w=majority
```

## 3. Nap Du Lieu Catalog That

Chay lenh:

```bash
npm run db:refresh
```

Lenh nay reset cac collection chinh va nap lai catalog sach that hon, gom:

- 5 category.
- 17 sach that co title, author, publisher, ISBN.
- Anh bia lay bang Open Library Covers API theo ISBN.
- `sourceUrl` tro ve trang ISBN tren Open Library.

Lenh nay cung tao tai khoan test:

```txt
Admin: admin@example.com / 123456
User:  user@example.com / 123456
```

Luu y: `npm run db:refresh` se reset cac collection chinh, nen khong dung tren database that neu khong muon mat du lieu.

## 4. Chay Project

Chay development:

```bash
npm run dev
```

Server mac dinh:

```txt
http://localhost:3000
```

Kiem tra:

```txt
GET http://localhost:3000/
```

## 5. Build Va Chay Production

Kiem tra TypeScript:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Chay ban da build:

```bash
npm start
```

## 6. Dung Swagger

Sau khi server dang chay, mo:

```txt
http://localhost:3000/api-docs
```

Swagger JSON:

```txt
http://localhost:3000/api-docs.json
```

## 7. Lay Token Trong Swagger

Goi login:

```txt
POST /api/auth/login
```

Body admin:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Body user:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Copy `token` trong response, bam nut `Authorize` tren Swagger va nhap:

```txt
Bearer jwt-token-here
```

Sau do co the goi cac API can dang nhap.

## 8. Cach Ghep API Tu Frontend

Base URL:

```txt
http://localhost:3000
```

API public:

```ts
const res = await fetch("http://localhost:3000/api/books");
const data = await res.json();
```

API can token:

```ts
const token = localStorage.getItem("token");

const res = await fetch("http://localhost:3000/api/cart", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const data = await res.json();
```

API gui JSON body:

```ts
const token = localStorage.getItem("token");

const res = await fetch("http://localhost:3000/api/cart/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    bookId: "book_id_here",
    quantity: 1,
  }),
});

const data = await res.json();
```

## 9. Quy Uoc API Phan Trang Va Get All

Nhung API tra danh sach se tach ro:

- Endpoint mac dinh `GET /api/<resource>`: tra du lieu co phan trang.
- Endpoint `GET /api/<resource>/all`: tra toan bo du lieu, khong phan trang.

Query phan trang:

```txt
page=1
limit=10
```

Response phan trang co dang:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

Ten field danh sach tuy resource se la `books`, `categories`, `users`, `orders` hoac `reviews`.

Danh sach endpoint phan trang va get all:

```txt
GET /api/books?page=1&limit=10
GET /api/books/all

GET /api/categories?page=1&limit=10
GET /api/categories/all

GET /api/users?page=1&limit=10
GET /api/users/all

GET /api/orders?page=1&limit=10
GET /api/orders/all

GET /api/orders/my-orders?page=1&limit=10
GET /api/orders/my-orders/all

GET /api/books/:bookId/reviews?page=1&limit=10
GET /api/books/:bookId/reviews/all
```

Luu y:

- `cart` va `wishlist` la du lieu rieng cua user hien tai, khong phai danh sach global nen khong tach phan trang.
- Cac API `/all` nen dung khi that su can lay toan bo du lieu, vi du dropdown category.
- Khi hien thi bang/list tren giao dien, nen dung API phan trang.

## 10. Flow API Cho User

Dang nhap:

```txt
POST /api/auth/login
```

Lay danh sach sach:

```txt
GET /api/books
GET /api/books?search=node&page=1&limit=10&sort=best_selling
GET /api/books/all
```

Gia tri `sort`:

```txt
newest
price_asc
price_desc
best_selling
```

Xem chi tiet sach:

```txt
GET /api/books/:id
```

Gio hang:

```txt
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:bookId
DELETE /api/cart/items/:bookId
DELETE /api/cart
```

Body them vao gio:

```json
{
  "bookId": "book_id_here",
  "quantity": 1
}
```

Don hang:

```txt
POST  /api/orders
GET   /api/orders/my-orders
GET   /api/orders/:id
PATCH /api/orders/:id/cancel
```

Body tao don:

```json
{
  "shippingAddress": "123 Demo Street",
  "phone": "0900000000",
  "note": "Call before delivery"
}
```

Wishlist:

```txt
GET    /api/wishlist
POST   /api/wishlist/:bookId
DELETE /api/wishlist/:bookId
```

Review:

```txt
GET    /api/books/:bookId/reviews?page=1&limit=10
GET    /api/books/:bookId/reviews/all
POST   /api/books/:bookId/reviews
PATCH  /api/reviews/:id
DELETE /api/reviews/:id
```

User chi review duoc sach da mua va don hang da `completed`.

## 11. Flow API Cho Admin

Admin dang nhap bang:

```txt
admin@example.com / 123456
```

Quan ly category:

```txt
GET    /api/categories?page=1&limit=10
GET    /api/categories/all
POST   /api/categories
GET    /api/categories/:id
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

Body tao category:

```json
{
  "name": "Programming",
  "description": "Programming books"
}
```

Quan ly book:

```txt
GET    /api/books?page=1&limit=10
GET    /api/books/all
POST   /api/books
GET    /api/books/:id
PATCH  /api/books/:id
DELETE /api/books/:id
PATCH  /api/books/:id/stock
```

Body tao book:

```json
{
  "title": "Clean Code",
  "description": "A practical guide to writing readable, maintainable and professional code.",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "price": 620000,
  "discountPrice": 559000,
  "stock": 20,
  "imageUrl": "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  "sourceUrl": "https://openlibrary.org/isbn/9780132350884",
  "categoryId": "category_id_here",
  "status": "active"
}
```

Luu y: anh sach chi luu bang URL trong truong `imageUrl`.

Quan ly user:

```txt
GET   /api/users?page=1&limit=10
GET   /api/users/all
GET   /api/users/:id
PATCH /api/users/:id/status
```

Body cap nhat status:

```json
{
  "status": "blocked"
}
```

Quan ly order:

```txt
GET   /api/orders?page=1&limit=10
GET   /api/orders/all
GET   /api/orders/:id
PATCH /api/orders/:id/status
```

Trang thai don hang:

```txt
pending
confirmed
shipping
completed
cancelled
```

Dashboard:

```txt
GET /api/admin/dashboard
GET /api/admin/statistics/revenue
GET /api/admin/statistics/books
```

## 12. Cau Truc Source Code

Project gom theo feature/module:

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
src/modules/tokens
```

Moi module thuong co:

```txt
*.model.ts
*.controller.ts
*.routes.ts
```

Phan dung chung:

```txt
src/config
src/constants
src/docs
src/middlewares
src/utils
src/types
```

## 13. Loi Thuong Gap

Khong ket noi duoc MongoDB:

- Kiem tra `MONGODB_URI`.
- Kiem tra username/password MongoDB Atlas.
- Kiem tra IP whitelist trong MongoDB Atlas.
- Kiem tra internet.

API can token bi `401`:

- Kiem tra da login chua.
- Kiem tra header `Authorization: Bearer jwt-token-here`.
- Kiem tra token het han chua.
- Kiem tra user co bi `blocked` khong.

API admin bi `403`:

- Tai khoan dang dung khong phai admin.
- Dang nhap bang `admin@example.com / 123456`.

Tao book bi loi category:

- Can tao category truoc.
- Lay `_id` cua category truyen vao `categoryId`.

## 14. Thu Tu Test API De De Hieu

Nen test theo thu tu:

```txt
1. npm run db:refresh
2. Login admin
3. Get categories
4. Create category neu can
5. Create book
6. Login user
7. Get books
8. Add book to cart
9. Create order
10. Admin update order status thanh completed
11. User create review
```
