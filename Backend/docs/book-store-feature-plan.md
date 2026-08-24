# Book Store API Feature Plan

## 1. Authentication

- Dang ky tai khoan.
- Dang nhap.
- Dang xuat.
- Lay thong tin user hien tai.
- Doi mat khau.
- Phan quyen co ban:
  - `user`: khach hang.
  - `admin`: quan tri.

API goi y:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PATCH /api/auth/change-password
```

## 2. User

- Xem thong tin ca nhan.
- Cap nhat thong tin ca nhan.
- Admin xem danh sach user.
- Admin xem chi tiet user.
- Admin khoa hoac mo khoa user.

API goi y:

```txt
GET   /api/users/me
PATCH /api/users/me
GET   /api/users
GET   /api/users/:id
PATCH /api/users/:id/status
```

## 3. Category

- Lay danh sach danh muc sach.
- Xem chi tiet danh muc.
- Admin them danh muc.
- Admin sua danh muc.
- Admin xoa danh muc.

API goi y:

```txt
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

## 4. Book

Truong du lieu co ban:

```txt
title
description
author
publisher
price
discountPrice
stock
imageUrl
categoryId
status
createdAt
updatedAt
```

Luu y: anh sach chi nhan `imageUrl` va luu URL vao database, khong upload file.

Tinh nang:

- Lay danh sach sach.
- Tim kiem sach theo ten hoac tac gia.
- Loc sach theo danh muc.
- Loc sach theo khoang gia.
- Sap xep theo gia, sach moi nhat hoac ban chay.
- Phan trang.
- Xem chi tiet sach.
- Admin them sach.
- Admin sua sach.
- Admin xoa sach.
- Admin cap nhat ton kho.

API goi y:

```txt
GET    /api/books
GET    /api/books/:id
POST   /api/books
PATCH  /api/books/:id
DELETE /api/books/:id
PATCH  /api/books/:id/stock
```

Vi du query:

```txt
GET /api/books?search=nodejs&categoryId=1&minPrice=50000&maxPrice=200000&page=1&limit=10&sort=price_asc
```

## 5. Cart

- Them sach vao gio hang.
- Xem gio hang.
- Cap nhat so luong sach trong gio.
- Xoa mot sach khoi gio.
- Xoa toan bo gio hang.

API goi y:

```txt
GET    /api/cart
POST   /api/cart/items
PATCH  /api/cart/items/:bookId
DELETE /api/cart/items/:bookId
DELETE /api/cart
```

## 6. Order

- Tao don hang tu gio hang.
- Xem danh sach don hang cua user.
- Xem chi tiet don hang.
- Admin xem tat ca don hang.
- Admin cap nhat trang thai don hang.
- User huy don hang neu don chua duoc xu ly.

Trang thai goi y:

```txt
pending
confirmed
shipping
completed
cancelled
```

API goi y:

```txt
POST  /api/orders
GET   /api/orders/my-orders
GET   /api/orders/:id
GET   /api/orders
PATCH /api/orders/:id/status
PATCH /api/orders/:id/cancel
```

## 7. Review And Rating

- User danh gia sach da mua.
- Xem danh sach review cua sach.
- Cap nhat review cua chinh minh.
- Xoa review cua chinh minh.
- Admin xoa review khong phu hop.

API goi y:

```txt
GET    /api/books/:bookId/reviews
POST   /api/books/:bookId/reviews
PATCH  /api/reviews/:id
DELETE /api/reviews/:id
```

## 8. Wishlist

- Them sach vao danh sach yeu thich.
- Xem danh sach yeu thich.
- Xoa sach khoi danh sach yeu thich.

API goi y:

```txt
GET    /api/wishlist
POST   /api/wishlist/:bookId
DELETE /api/wishlist/:bookId
```

## 9. Admin Dashboard

- Tong so user.
- Tong so sach.
- Tong so don hang.
- Tong doanh thu.
- Sach sap het hang.
- Don hang moi nhat.

API goi y:

```txt
GET /api/admin/dashboard
GET /api/admin/statistics/revenue
GET /api/admin/statistics/books
```

## 10. Database Entities

Nhung model chinh nen co:

```txt
User
Category
Book
Cart
CartItem
Order
OrderItem
Review
Wishlist
```

Database su dung MongoDB thong qua Mongoose. Anh sach luu bang truong `imageUrl`.

## 11. Implementation Order

1. Setup project, database, environment variables va error handler.
2. Lam authentication: register, login, logout va auth middleware.
3. Lam user profile.
4. Lam category CRUD.
5. Lam book CRUD, list, search, filter va pagination.
6. Lam cart.
7. Lam order.
8. Lam review va rating.
9. Lam wishlist.
10. Lam admin dashboard.
11. Them validation, authorization va test API.

## Core Scope

Voi project ban sach co ban, nen uu tien lam chac cac phan sau:

- Authentication.
- Book listing.
- Book detail.
- Cart.
- Order.
- Admin CRUD cho category va book.
