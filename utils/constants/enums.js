const objNotation = {
	General: {
		View: {
			My: 'My',
			All: 'All',
			Default: 'Default',
		},
	},
	Status: {
		Open: 'Open',
		Closed: 'Closed',
		Busy: 'Busy',
	},
};

const toArray = (enumObj) => Object.values(enumObj).filter((val) => typeof val === 'string');

module.exports = { ...objNotation, toArray };
