const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/userController");
const verifyToken = require("../Middleware/verifyToken");

const { getUserDetails } = require("../Controllers/userController");

router.get("/user", UserController.getUsers);
router.get("/", UserController.getUsers);
router.put("/toggle/:id", UserController.toggleUserStatus);

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/forgotpassword", UserController.forgotPassword);
router.post("/verifyotp", UserController.verifyOTP);
router.post("/resetpassword", UserController.resetPassword);
router.get("/logout", UserController.logout);
router.delete("/user/:id", UserController.deleteUser);

router.get("/adminpage", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have accessed the protected route",
    user: req.user,
  });
});

module.exports = router;
