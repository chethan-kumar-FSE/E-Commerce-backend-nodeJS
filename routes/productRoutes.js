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

  if (productClone) {
    console.log("some cahnges bro");
  }

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
    const newProp = 10;
    const a = 10;
    const productClone = {
      ...product,
      fetchedAt: new Date().toDateString(),
      newProp: "new",
      customPropeties: {},
      main: "main",
      a: 10,
      sample: "property",
      otherChanges: {
        a: 10,
      },
      newChange: "newChanghe",
      otherFeature: {},
    };

    if (productClone) {
      console.log("its right");
      console.log(productClone?.newProp);
    }

    const newArray = [1, 2, 3];

    if (productClone) {
      console.log("new changes");
    }
    return res.status(200).send({
      status: "success",
      data: { productClone, newArray },
    });
  } catch (err) {
    return res.status(500).send({
      message: "something went wrong",
    });
  }
});

module.exports = router;
