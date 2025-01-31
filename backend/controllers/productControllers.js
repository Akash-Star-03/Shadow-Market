const productModel = require('../models/productModel');

// Get Products API - /api/v1/product
exports.getProducts = async (req, res, next) => {
  try {
    // Construct query if a keyword is provided
    const query = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    // Fetch products using the query object
    const products = await productModel.find(query);

    // Return success response
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: 'Error fetching products.',
    });
  }
};

// Get Single Product API - /api/v1/product/:id
exports.getSingleProducts = async (req, res, next) => {
  try {
    // Fetch product by ID
    const product = await productModel.findById(req.params.id);

    // If product is not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Return success response with the product
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    // Handle any errors (e.g., invalid ID format)
    res.status(500).json({
      success: false,
      message: 'Error fetching the product.',
    });
  }
};
