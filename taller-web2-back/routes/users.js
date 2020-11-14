var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user')

/* GET users listing. */
router.get('/', user_controller.index);

/*POST user*/
router.post('/', user_controller.create)

module.exports = router;
