const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const brcyt = require("bcryptjs");
const userService = require("../services/user-service");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password are requird");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Email or password is invalid");
    }

    const isUserExist = await userService.getUserByEmail(email);

    if (isUserExist) {
      return createError(400, "User already exist");
    }

    const hashedPassword = await brcyt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json({ massage: "register succecs" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return createError(400, "Email and password are required");
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return createError(400, "Email or password is invalid");
    }

    const isUserExist = await userService.getUserByEmail(email);

    if (!isUserExist) {
      return createError(400, "Email or password is invalid");
    }

    const isPasswordMatch =  brcyt.compare(password, isUserExist.password);

    if (!isPasswordMatch) {
      return createError(400, "Email or password is invalid");
    }

    const token = jwt.sign({ id: isUserExist.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;
  // gen token -> สร้าง link -> ส่ง email
  res.json({ email });
};

// https://api.codecamp.com/auth/forget-password/kdjfkdjfkdjkfjd
exports.verifyForgetPassword = (req, res, next) => {
  const { token } = req.params;
  // logic check token
  // redirect reset password -> ติด token
  res.json({ token });
};

exports.resetPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
 
  res.json({ token, password });
};