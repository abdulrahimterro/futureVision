const { check } = require('./permissions');

module.exports = (p = { strategy: 'jwt', permissions: [], strict: true }) => {
	const authenticate = require('../../src/app/auth/authenticate');
	let strategy = 'jwt';
	let strict = true;
	let permissions = [];
	if (typeof p === 'string') {
		strategy = p;
	} else {
		strategy = p.strategy ?? strategy;
		strict = p.strict ?? strict;
		permissions = p.permissions ?? permissions;
	}
	return [authenticate(strategy, { strict }), check(permissions)];
};
