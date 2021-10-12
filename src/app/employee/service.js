const { Exception, errors, permissions, commonConstant } = require('utils');
const { mongodb } = require('database');
const mongoose = require('mongoose');
const { Employee, Department } = mongodb.Models;
const { convertToDotNotation } = mongodb.utils;
const FileService = require('../file/service');
const { compare } = require('bcrypt');

class UserService {
	static refPath = commonConstant.refPath.User;
	constructor(data, files) {
		this.name = data.name;
		this.status = data.status;
		this.position = data.position;
		this.dob = data.dob;
		this.phone = data.phone;
		this.email = data.email;
		this.sex = data.sex;
		this.type = data.type;
		this.bonus = data.bonus;
		this.salary = data.salary;
		this.joiningDate = data.joiningDate;
		this.visa = data.visa;
		this.passport = data.passport;
		this.labor = data.labor;
		this.remindBefore = data.remindBefore;
		this.cardNo = data.cardNo;
		this.Commission_Collected_Invoice_Flag = data.Commission_Collected_Invoice_Flag;
		this.OpeningBalance = data.OpeningBalance;
		this.department = data.department;
		this.IsCoordinator = data.IsCoordinator;
		this.IsManager = data.IsManager;
		this.FAV = data.FAV;

		this.files = [];
		if (files?.photo) {
			const refPath = UserService.refPath.photo;
			this.photo = new FileService(files.photo[0], { refPath, disk: true });
			this.files.push(this.photo);
		}
	}

	async save(user) {
		this.createdBy = "logedin User"
		if (this.photo) this.photo = await this.photo.save(session);
		const [result, depExist] = await Promise.all([new Employee(this).save(), Department.exists({ _id: this.department }), this.files.map((val) => val.write())]);
		if (!depExist) throw new Exception(errors.department.Not_Found);
		return { data: { id: result.id } };
	}

	async update(user, _id) {
		const session = await mongoose.startSession();
		await session.withTransaction(async (session) => {
			if (this.photo) this.photo = await this.photo.save(session);
			const result = await Employee.findOneAndUpdate({ _id }, this, { session, omitUndefined: true });
			if (!result) throw new Exception(errors.user.Not_Found);
			if (!this.photo && result.photo) {
				await FileService.delete(result.photo, session);
				console.log('ddddd')
			}
			await Promise.all(this.files.map((val) => val.write()));
		});
	}

	static async delete(user, _id) {
		const session = await mongoose.startSession();
		await session.withTransaction(async (session) => {
			const result = await Employee.findOneAndDelete({ _id }, { session, project: 'photo' });
			if (!result) throw new Exception(errors.user.Not_Found);
			console.log(result.photo)
			if (result.photo) await FileService.delete(result.photo, session);
		});
	}

	static async getById(user, id) {
		const result = await Employee.findById(id).populate('photo department');
		if (!result) throw new Exception(errors.user.Not_Found);
		return { data: result };
	}

	static async getByCriteria(user, criteria, { skip, limit, total }) {
		const conditions = (() => {
			const result = {};

			if (criteria.name) result['name'] = new RegExp(`^${criteria.name}`, 'i');
			if (criteria.status) result['status'] = criteria.status;
			if (criteria.position) result['position'] = criteria.position;
			if (criteria.dobGT && criteria.dobLT) result['dob'] = { $gte: criteria.dobGT, $lte: criteria.dobLT };
			else if (criteria.dobGT) result['dob'] = { $gte: criteria.dobGT };
			else if (criteria.dobLT) result['dob'] = { $lte: criteria.dobLT };

			if (criteria.mobile) result['phone.mobile'] = new RegExp(`^${criteria.mobile}`, 'i');
			if (criteria.tele) result['phone.tele'] = new RegExp(`^${criteria.tele}`, 'i');

			if (criteria.email) result['email'] = new RegExp(`^${criteria.email}`, 'i');
			if (criteria.sex) result['sex'] = criteria.sex;
			if (criteria.type) result['type'] = criteria.type;
			if (criteria.department) result['department'] = criteria.department;

			return result;
		})();

		const result = await Employee.findAndCount(total, conditions, '', {
			skip,
			limit,
			populate: { path: 'photo', select: '-_id' },
		});
		return result;
	}
}

module.exports = UserService;
