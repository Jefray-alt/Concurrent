const { Transaction, Sequelize } = require('sequelize');
const sequelize = require('./connection');
const Counter = require('./models/Counter');

async function run() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

async function increment() {
	const result = await sequelize.transaction(async (t) => {
		// Lock the row you want to update
		const record = await Counter.findOne({
			where: { id: 1 },
			lock: true,
			transaction: t,
		});

		// Increment the counter based on the number of previous updates
		const nthUpdate = record.currentValue + 1;
		const nRecord = await Counter.create({
			currentValue: nthUpdate
		}, {transaction: t});

		return nRecord;
	});

	return result;
}

async function main() {
	// await run();
	const data = await Promise.all([increment(), increment()]);
	console.log(data);
}

main();
