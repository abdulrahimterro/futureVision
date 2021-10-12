const { Exception, errors, permissions, commonConstant } = require('utils');
const { mongodb } = require('database');
const mongoose = require('mongoose');
const { Department } = mongodb.Models;

class DepartmentService {
	constructor(data) {
		this.name = data.name;
		this.description = data.description
	}

	async save(user) {
		const result = await new Department(this).save();
		return { data: { id: result.id } };
	}

	async update(user, _id) {
		const result = await Department.findOneAndUpdate({ _id }, this, { omitUndefined: true });
		if (!result) throw new Exception(errors.department.Not_Found);
	}

	static async delete(user, _id) {
		const result = await Department.deleteOne({ _id });
		if (!result) throw new Exception(errors.department.Not_Found);

	}

	static async getById(user, id) {
		const result = await Department.findById(id);
		if (!result) throw new Exception(errors.department.Not_Found);
		return { data: result };
	}

	static async getByCriteria(user, criteria, { skip, limit, total }) {
		const conditions = (() => {
			const result = {};

			if (criteria.name) result['name'] = new RegExp(`^${criteria.name}`, 'i');
			if (criteria.description) result['description'] = new RegExp(`^${criteria.description}`, 'i');

			return result;
		})();

		const result = await Department.findAndCount(total, conditions, '', { skip, limit });
		return result;
	}
}

module.exports = DepartmentService;
