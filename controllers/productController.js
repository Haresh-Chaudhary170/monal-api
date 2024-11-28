const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require("../utils/apiFeatures");

exports.addProduct = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const resultsPerPage = 3;
    // const productCount=Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultsPerPage);
    const products = await apiFeatures.query;
    // const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      // productCount:productCount,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        message: "Product not found.",
        success: false,
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

//add product reviews
exports.addProductReview = async (req, res, next) => {
  try {
    const { rating, comments, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comments,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      //update review
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.rating = Number(rating);
          review.comments = comments;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    //calculate average ratings
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};
//get all the reviews of product
exports.getProductReviews = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//delete product review
exports.deleteProductReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Review not Found", 404));
    }
    const reviews = product.reviews.filter((review) => {
      review._id.toString() !== productId.toString();
    });
    //num of reviews
    const numOfReviews = reviews.length;

    //calculate average ratings
    const ratings =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      reviews.length;

    await Product.findByIdAndUpdate(
      productId,
      {
        reviews,
        ratings,
        numOfReviews: numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
