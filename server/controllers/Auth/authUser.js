const asyncHandler = require("../../middleware/async");
const User = require("../../models/userModel");

/**
 * @description Validate User, Send back Token
 * @route       POST /api/user/login
 * @Access      Public
 *
 *
 * @Comment    // ? This route will only ever auth the admin user from the pokemon tcg database
 *
 */
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user.isActive) {
      return res.status(404).json({ message: `Account was disabled` });
    }
    if(!user.isAdmin){
      return res.status(400).json({message: `You are not Authorized to access this application`})
    }
    // User Auth
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error, please try again later!" });
  }
});
module.exports = authUser;