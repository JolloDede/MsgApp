const { default: Surreal } = require("surrealdb.js");

const db = new Surreal('http://127.0.0.1:8000', {
	// Set the namespace and database for the connection
	ns: 'ChatApp',
	db: 'ChatApp',

	// Set the authentication details for the connection
	auth: {
		// NS: 'test',
		// DB: 'test',
		// SC: 'user',
		user: 'root',
		pass: 'root',
	},
});

module.exports = db;