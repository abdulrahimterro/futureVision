const mongoose = require('mongoose');
const { findAndCount, aggregateAndCount } = require('./plugins');
const {
	database: { mongodb },
} = require('config-keys');

mongoose.plugin(findAndCount);
mongoose.plugin(aggregateAndCount);
mongoose.set('debug', mongodb.debug);
module.exports = {
	connection: mongoose.connect(mongodb.uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		bufferCommands: false,
		useCreateIndex: true,
		useFindAndModify: false,
		dbName: mongodb.dbName,
	}),
	Models: require('./Models'),
	utils: require('./utils'),
};
