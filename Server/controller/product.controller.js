const Product = require("../model/Product");
const User = require("../model/User");
const uploadToCloudinary = require("../utils/Cloudinary");
const fs = require("fs");
const { Op } = require('sequelize');

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { category, title, description, price } = req.body;

    if (!category || !title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path);
        if (result?.secure_url) {
          photoUrls.push(result.secure_url);
        }
        fs.unlinkSync(file.path);
      }
    }
    console.log({ photoUrls });

    const product = await Product.create({
      category,
      title,
      description,
      price,
      photos: photoUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message || "Internal Server Error",
    });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message || "Internal Server Error",
    });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message || "Internal Server Error",
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      price,
      existingPhotos = [],
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let photoUrls = Array.isArray(existingPhotos)
      ? existingPhotos
      : [existingPhotos];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path);
        if (result?.secure_url) {
          photoUrls.push(result.secure_url);
        }
        fs.unlinkSync(file.path);
      }
    }

    await product.update({
      category: category || product.category,
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
      photos: photoUrls,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const addToWishlist = async (req, res) => {
  try {
      const { userId, productId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      // const wishlist = user.wishlist || [];
      if (!user.wishlist?.includes(productId)) {
        const updatedWishlist = [...(user.wishlist || []), productId];
        user.set('wishlist', updatedWishlist);
        await user.save();
      }

      console.log({wishlist: user.wishlist});
      return res.status(200).json({
          success: true,
          message: "Product added to wishlist",
          data: user.wishlist,
      });
  } catch (error) {
      console.error("Error adding to wishlist:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to add to wishlist",
          error: error.message || "Internal Server Error"
      });
  }
};



// REMOVE FROM WISHLIST
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedWishlist = (user.wishlist || []).filter(id => id !== productId);
    
    // Directly assigning the new array to ensure Sequelize detects the change
    user.set('wishlist', updatedWishlist); 
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message || "Internal Server Error",
    });
  }
};



// GET WISHLIST
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const wishlistProducts = await Product.findAll({
      where: {
        id: {
          [Op.in]: user.wishlist,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlistProducts,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist,
  getWishlist
};
