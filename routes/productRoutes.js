const express = require("express");
const router = express.Router();
const Products = require("../models/productModel");

router.post("/products", async (req, res) => {
  const body = {
    productId: "prod_EL123",
    productName: "Smartphone Pro Max",
    category: "electronics",
    description:
      "A high-end smartphone with advanced features and great performance.",
    currentStock: 150,
    price: 999.99,
    manufacturer: "TechCorp Inc.",
    placeOfOrigin: "USA",
    warranty: "2 years",
    shouldDisplay: true,
    overAllRating: 4.8,
  };

  const product = await Products.create(body);

  res.status(200).json({
    message: "send",
    product,
  });
});

module.exports = router;
