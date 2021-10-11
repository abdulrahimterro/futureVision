const router = require('express').Router();

/********************
 * @Router /api     *
 ********************/

router.use('/employee', require('./employee/router'));

router.use('/auth', require('./auth/router'));

module.exports = router;
