const { checkAccessibility, permissions, multerUpload } = require('utils');
const { User, Admin } = permissions.codes;
const handler = require('./handler');
const validator = require('./validator');
const router = require('express').Router();

/************************
 * @Router  /api/department   *
 ************************/

router.post('/', validator.save, handler.save);

router.patch('/:id', validator.update, handler.update);

router.delete('/:id', validator.paramId, handler.delete)

router.get('/:id', validator.paramId, handler.getById);

router.get('/', validator.getByCriteria, handler.getByCriteria);

module.exports = router;
