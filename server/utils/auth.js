import express from "express";
import {
  login,
  signup,
  getAllUsers,
  setAvatar,
  logOut,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

export default router;
