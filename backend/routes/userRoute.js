const router = require("express").Router();
const {signin , login} = require("../controllers/userController.js")

router.post("/sign-in",signin);
router.post("/log-in",login)

module.exports =router;