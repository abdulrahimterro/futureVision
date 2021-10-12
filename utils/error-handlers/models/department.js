const codes = require('../codes');
const httpCodes = require('../../constants/httpStatus');
const statusCodes = require('../../constants/statusCodes');

module.exports = {
    Not_Found: {
        httpStatus: httpCodes.NOT_FOUND,
        code: codes.auth + statusCodes.Item_Not_Found + '1',
        msg: 'Department not found.',
    },

};
