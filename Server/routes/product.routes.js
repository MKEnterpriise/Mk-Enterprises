const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controller/product.controller");


router.post("/create", upload, createProduct);
router.get("/allProducts", getProducts);
router.get("/:id", getProductById);
router.put("/update/:id", upload, updateProduct);
router.delete("/delete/:id", deleteProduct);

router.post('/addToWishlist', addToWishlist)
router.post('/removeWishlist', removeFromWishlist)
router.get('/getWishlist/:userId', getWishlist)
module.exports = router;
