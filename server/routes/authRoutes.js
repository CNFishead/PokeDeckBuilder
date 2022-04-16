const express = require("express");
const authUser = require("../controllers/Auth/authUser.js");

const router = express.Router();

router.post(`/login`, authUser);


module.exports = router;
