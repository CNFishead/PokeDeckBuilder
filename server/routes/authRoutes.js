const express = require("express");
const authUser = require("../controllers/Auth/authUser.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post(`/login`, authUser);

//This will return the user profile on a GET command
//Will update user profile on a PUT command
//Both routes are protected, and will need a valid token passed back to work correctly.
// router.route("/forgotpassword").post(ForgotPassword);
// router.route("/resetpassword/:resettoken").put(ResetPassword);

module.exports = router;
