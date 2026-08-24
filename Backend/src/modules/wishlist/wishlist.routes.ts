import { Router } from "express";
import * as wishlistController from "./wishlist.controller";
import { authRequired } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authRequired, wishlistController.getWishlist);
router.post("/:bookId", authRequired, wishlistController.addWishlistBook);
router.delete("/:bookId", authRequired, wishlistController.removeWishlistBook);

export default router;
