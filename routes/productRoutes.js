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

router.post("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findOne({
      productId: id,
    });
    if (!product) {
      return res.status(404).send({
        message: "Product not found",
        status: "failure",
      });
    }
    return res.status(200).send({
      status: "success",
      data: product,
    });
  } catch (err) {
    return res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = router;
