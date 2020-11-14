var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product')

router.get("/", product_controller.index)
router.post("/", product_controller.create)
router.get("/:id", product_controller.show)
router.delete("/:id", product_controller.delete)
router.put("/:id", product_controller.update)

module.exports = router;