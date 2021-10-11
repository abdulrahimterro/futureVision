const { checkAccessibility, permissions, multerUpload } = require('utils');
const { User, Admin } = permissions.codes;
const handler = require('./handler');
const validator = require('./validator');
const router = require('express').Router();

// 1024 * 1024 * 5 = 5 mb
const upload = multerUpload(1, 1024 * 1024 * 5, ['image/jpeg', 'image/png']).fields([{ name: 'photo', maxCount: 1 }]);

/************************
 * @Router  /api/user   *
 ************************/

router.post('/', validator.save, handler.save);

router.patch('/:id', upload, validator.update, handler.update);

router.delete('/:id', validator.paramId, handler.delete)

router.get('/:id', validator.paramId, handler.getById);

router.get('/', validator.getByCriteria, handler.getByCriteria);

module.exports = router;
