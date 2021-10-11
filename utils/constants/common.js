module.exports = {
	pagination: {
		defaultLimit: 50,
		defaultSkip: 0,
		defaultTotal: false,
		defaultView: 'default',
	},

	refPath: {
		general: { path: 'general' },
		User: {
			path: 'user',
			avatar: { path: 'user/avatar', access: ['public'] },
		},
	},
};
