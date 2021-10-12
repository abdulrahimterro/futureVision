const codes = require('../codes');
const httpCodes = require('../../constants/httpStatus');
const statusCodes = require('../../constants/statusCodes');

module.exports = {
	Not_Found: {
		httpStatus: httpCodes.BAD_REQUEST,
		code: codes.user + statusCodes.Item_Not_Found + '01',
		msg: 'User not found.',
	},
	Exists: {
		httpStatus: httpCodes.CONFLICT,
		code: codes.user + statusCodes.Invalid_Operation + '01',
		msg: 'User With email or phone number exists.',
	},
};
