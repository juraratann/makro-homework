const cloudUploads = require("../utils/cloudUploads");

exports.createProduct = async (req, res, next) => {
  try {
    
    await cloudUploads(req.files[0].path)
    res.json({ massage: "Create Product" });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    res.json({ massage: "Update Product" });
  } catch (err) {
    next(err);
  }
};

exports.createCatgory = async (req, res, next) => {
  try {
    res.json({ massage: "Create Catgory" });
  } catch (err) {
    next(err);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    res.json({ massage: "Create Brand" });
  } catch (err) {
    next(err);
  }
};

exports.createPromotion = async (req, res, next) => {
  try {
    res.json({ massage: "Create Promotion" });
  } catch (err) {
    next(err);
  }
};