const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware.js");
const imageController = require("../controllers/imageController.js");

const router = express.Router();
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(admin);

// Will upload an image to the images folder and return a path directory.
router.route("/").post(imageController);

// Will upload a new resume to data
// router.route('/resume').post('')

module.exports = router;
