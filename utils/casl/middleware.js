const { Ability, defineAbility, ForbiddenError } = require('@casl/ability');
const { Exception, statusCodes, errors } = require('utils');
const { CompanyType } = require('../../../core/company/meta');

module.exports = (action, model) => (req, res, next) => {
	if (next === undefined) next = res;
	const userType = req.user.personalInfo.company?.type || 'Admin';
	const systemAbilities = require(`./abilities`)[model];

	const userAbilities = systemAbilities[companyType];
	if (!userAbilities) throw new Exception(errors.auth.Unauthorized);

	req.user.abilities = new Ability(userAbilities(req.user));

	if (req.user.abilities.can(action, model)) next();
	else throw new DeprecatedException(statusCodes.FORBIDDEN);
};
