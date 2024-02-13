// Import statements
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Async function for login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // This approach might not work as expected because Mongoose objects are not plain JavaScript objects.
    // Consider using `.toObject()` method or explicitly excluding the password in the query.
    return res.json({
      status: true,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (ex) {
    next(ex);
  }
};

// Async function for register
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.json({
      status: true,
      user: { ...user.toObject(), password: undefined },
    });
  } catch (ex) {
    next(ex);
  }
};

// Async function for getAllUsers
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// Async function for setAvatar
export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage },
      { new: true },
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

// Function for logOut
export const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required" });
    // Assuming onlineUsers is a Map or similar structure you're managing elsewhere
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
