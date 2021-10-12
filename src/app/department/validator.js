const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { joiSchema } = require('utils');

const params = { id: Joi.objectId().required() };

const paramId = Joi.object({ params });

const save = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
		description: Joi.string(),
	}),
});

const update = Joi.object({
	params,
	body: {
		name: Joi.string(),
		description: Joi.string(),
	},
});

const getByCriteria = Joi.object({
	query: {
		limit: Joi.number().integer().min(1),
		skip: Joi.number().integer().min(0),
		total: Joi.boolean(),
		name: Joi.string(),
		description: Joi.string(),
	},
});

module.exports = {
	save: joiSchema.validate(save),
	update: joiSchema.validate(update),
	paramId: joiSchema.validate(paramId),
	getByCriteria: joiSchema.validate(getByCriteria),
};
