const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { joiSchema } = require('utils');

const params = { id: Joi.objectId().required() };

const paramId = Joi.object({ params });

const save = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
		status: Joi.string().required(),
		position: Joi.string().required(),
		dob: Joi.date().required(),
		phone: Joi.object({
			tele: Joi.string(),
			mobile: Joi.string(),
		}).required().or('tele', 'mobile'),
		email: Joi.string().email().required(),
		sex: Joi.string().valid('Male', 'Female').required(),
		type: Joi.string().required(),

		bonus: Joi.object({
			value: Joi.string().required(),
			percent: Joi.number().required(),
			from: Joi.string().required(),
		}).required(),

		salary: Joi.object({
			value: Joi.number().required(),
			perHour: Joi.number().required(),
			overTimePerHour: Joi.number().required(),
		}).required(),

		joiningDate: Joi.date().required(),

		visa: Joi.object({
			status: Joi.string().required(),
			expiry: Joi.string().required(),
		}).required(),

		passport: Joi.object({
			number: Joi.string().required(),
			issue: Joi.date().required(), //min max
			expiry: Joi.date().required(),
		}).required(),

		labor: Joi.object({
			cardNo: Joi.string().required(),
			issue: Joi.date().required(), //min max
			expiry: Joi.date().required(),
		}).required(),

		remindBefore: Joi.number().integer().required(),

		cardNo: Joi.string().required(),
		Commission_Collected_Invoice_Flag: Joi.boolean().required(),
		OpeningBalance: Joi.object({
			value: Joi.number().required(),
			date: Joi.date().required(),
		}).required(),

		department: Joi.objectId().required(),
		IsCoordinator: Joi.boolean().required(),
		IsManager: Joi.boolean().required(),
		FAV: Joi.boolean().required(),
	}),
});

const update = Joi.object({
	params,
	body: {
		name: Joi.string(),
		status: Joi.string(),
		position: Joi.string(),
		dob: Joi.date(),
		tele: Joi.string(),
		mobile: Joi.string(),
		email: Joi.string().email(),
		sex: Joi.string().valid('Male', 'Female'),
		type: Joi.string(),

		bonus: Joi.object({
			value: Joi.string().required(),
			percent: Joi.number().min(0).max(100).required(),
			from: Joi.string().required(),
		}),

		salary: Joi.object({
			value: Joi.number().required(),
			perHour: Joi.number().required(),
			overTimePerHour: Joi.number().required(),
		}),

		joiningDate: Joi.date(),

		visa: Joi.object({
			status: Joi.string().required(),
			expiry: Joi.string().required(),
		}),

		passport: Joi.object({
			number: Joi.string().required(),
			issue: Joi.date().required(),
			expiry: Joi.date().min(Joi.ref('issue')).required(),
		}),

		labor: Joi.object({
			cardNo: Joi.string().required(),
			issue: Joi.date().required(),
			expiry: Joi.date().min(Joi.ref('issue')).required(),
		}),

		remindBefore: Joi.number().integer(),

		cardNo: Joi.string(),
		Commission_Collected_Invoice_Flag: Joi.boolean(),
		OpeningBalance: Joi.object({
			value: Joi.number().required(),
			date: Joi.date().required(),
		}),

		department: Joi.objectId(),
		IsCoordinator: Joi.boolean(),
		IsManager: Joi.boolean(),
		FAV: Joi.boolean(),
	},
});

const getByCriteria = Joi.object({
	query: {
		limit: Joi.number().integer().min(1),
		skip: Joi.number().integer().min(0),
		total: Joi.boolean(),
		name: Joi.string(),
		status: Joi.string(),
		position: Joi.string(),
		dobGT: Joi.date(),
		dobLT: Joi.date(),
		tele: Joi.string(),
		mobile: Joi.string(),
		email: Joi.string(),
		sex: Joi.string().valid('Male', 'Female'),
		type: Joi.string(),
		department: Joi.objectId(),
	},
});

module.exports = {
	save: joiSchema.validate(save),
	update: joiSchema.validate(update),
	paramId: joiSchema.validate(paramId),
	getByCriteria: joiSchema.validate(getByCriteria),
};
