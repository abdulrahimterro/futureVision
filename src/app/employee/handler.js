const { httpStatus, getPagination } = require('utils');
const Employee = require('./service');
const { enums } = require('utils');
const params = enums.User;

module.exports = {
	async save(req, res) {
		const { user, body: data } = req;
		const { id } = req.params;
		const result = await new Employee(data).save(user, id);
		res.status(httpStatus.CREATED).send(result);
	},

	async update(req, res) {
		const { user, body: data, files } = req;
		const { id } = req.params;
		await new Employee(data, files).update(user, id);
		res.sendStatus(httpStatus.UPDATED);
	},

	async delete(req, res) {
		const { user } = req;
		const { id } = req.params;
		await Employee.delete(user, id);
		res.sendStatus(httpStatus.DELETED);
	},

	async getById(req, res) {
		const { user } = req;
		const { id } = req.params;
		const result = await Employee.getById(user, id);
		res.status(httpStatus.OK).send(result);
	},

	async getByCriteria(req, res) {
		const { user } = req;
		const { criteria, pagination } = getPagination(req.query);
		const result = await Employee.getByCriteria(user, criteria, pagination);
		res.status(httpStatus.OK).send(result);
	},
};
