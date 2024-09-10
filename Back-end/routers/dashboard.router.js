const Router = require("express");

const router = Router();

const { dashboard } = require("../controller/dashboard.controller.js");

router.route("/dashboard/stats").get(dashboard);

module.exports = router;
