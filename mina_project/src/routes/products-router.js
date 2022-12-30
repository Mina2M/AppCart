const express = require("express");
const productsController = require("../controllers/products-controller");

const router = express.Router();

router.get("/", productsController.getAll);

router.get("/:id", productsController.getOne);

router.post("/", productsController.createOne);

router.put("/:id", productsController.updateOne);

router.delete("/:id", productsController.deleteOne);

router.post("/add_to_cart", productsController.addToCart);

router.post("/cart", productsController.getProdsInCart);

router.post("/cart_remove", productsController.removeFromCart);

router.post("/discount", productsController.addDiscount);

router.get(
  "/get_all_discounts/:product_id",
  productsController.productDiscounts
);

router.get("/get_all_reviews/:product_id", productsController.productReviews);

router.post("/add_review", productsController.addReview);

router.post("/place_order", productsController.placeOrder);

router.get("/get_orders/:user_id", productsController.getUserOrders);

router.post("/get_country_analysis", productsController.getCountryAnalysis);

module.exports = router;
