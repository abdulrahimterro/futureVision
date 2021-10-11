const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultOptions = require('../utils/defaultOptions');
const bcrypt = require('bcrypt');
const {
	bcrypt: { rounds },
} = require('config-keys');

const User = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
			set: (val) => (val ? bcrypt.hashSync(val, rounds) : undefined),
		},
		verificationCode: { type: String, select: false },
		verified: { type: Boolean, required: true, default: false },
		verifyAttempts: { type: [Date], select: false },
		type: { type: String, default: 'User', required: true },
	},
	defaultOptions({ timestamps: true })
);

User.virtual('name').get(function () {
	return this.firstName + ' ' + this.lastName;
});

User.methods.verifyPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', User, 'User');
