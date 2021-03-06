const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultOptions = require('../utils/defaultOptions');

const Department = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String }
	},
	defaultOptions({ timestamps: true })
);

module.exports = mongoose.model('Department', Department, 'Department');
