const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const UserController = {
  async getUsers(req, res) {
    try {
      const { search, filter, limit = 10, page = 1 } = req.query;
      const offset = (page - 1) * limit;

      const users = await UserModel.getAllUsers({
        search,
        filter,
        limit,
        offset,
      });
      const totalUsers = await UserModel.getTotalUsers({ search, filter });

      res.json({
        items: users,
        totalPages: Math.ceil(totalUsers / limit),
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Server error");
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserModel.deleteUser(id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Server error");
    }
  },

  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const newStatus = user.is_active === 0 ? 1 : 0;
      await UserModel.updateUserStatus(id, newStatus);
      res.json({ id, is_active: newStatus });
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).send("Server error");
    }
  },

  async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await UserModel.getUserByUsernameOrEmail(
        username,
        email
      );
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username or email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.createUser(username, email, hashedPassword);

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(201)
        .json({ success: true, message: "User signed up successfully", token });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ success: true, message: "Login successful", token, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await UserModel.updateResetToken(email, otp);

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is ${otp}`,
      };

      const sendMail = async (transporter, mailOptions) => {
        try {
          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully");
          res
            .status(200)
            .json({ success: true, message: "Email sent successfully" });
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };
      sendMail(transporter, mailOptions);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async verifyOTP(req, res) {
    const { email, otp } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (user.reset_token !== otp) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or expired OTP" });
      }

      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  async resetPassword(req, res) {
    const { email, newPassword } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await UserModel.updatePassword(email, hashedPassword);
      await UserModel.clearResetToken(email);

      res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async getUserDetails(req, res) {
    const userId = req.userId;

    try {
      const user = await UserModel.getUserByEmail(userId);
      if (user) {
        res.json({ username: user.username, email: user.email });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Database error:", error.message);
      res.status(500).json({
        success: false,
        message: "Database error",
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
