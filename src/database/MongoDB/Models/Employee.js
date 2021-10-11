const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultOptions = require('../utils/defaultOptions');

const Employee = new Schema(
	{
		name: { type: String, required: true },
		status: { type: String, required: true },
		position: { type: String, required: true },
		dob: { type: Date, required: true },
		phone: { tele: { type: String }, mobile: { type: String } },
		email: { type: String, required: true },
		sex: { type: String, required: true },
		type: { type: String },

		bonus: {
			value: { type: String, required: true },
			percent: { type: Number, require: true },
			from: { type: String, required: true },
		},
		salary: {
			value: { type: Number, required: true },
			perHour: { type: Number, required: true },
			overTimePerHour: { type: Number, required: true },
		},
		joiningDate: { type: Date, default: Date.now() },
		visa: {
			status: { type: String, required: true },
			expiry: { type: String, required: true },
		},
		passport: {
			number: { type: String, required: true },
			issue: { type: Date, required: true },
			expiry: { type: Date, required: true },
		},
		labor: {
			cardNo: { type: String, required: true },
			issue: { type: Date, required: true },
			expiry: { type: Date, required: true },
		},
		remindBefore: { type: Number, required: true },
		photo: { type: Schema.Types.ObjectId, ref: 'File', },
		createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		cardNo: { type: String, required: true },
		Commission_Collected_Invoice_Flag: { type: Boolean, required: true },
		OpeningBalance: {
			value: { type: Number, required: true },
			date: { type: Date, required: true },
		},
		department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
		IsCoordinator: { type: Boolean, required: true },
		IsManager: { type: Boolean, required: true },
		FAV: { type: Boolean, required: true },
	},
	defaultOptions({ timestamps: true })
);

module.exports = mongoose.model('Employee', Employee, 'Employee');
