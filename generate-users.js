'use strict';
const { v4: uuidv4 } = require('uuid');
const createDbInstanceJs = require('./util/camperprodbjs');

const db = createDbInstanceJs();
const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Isabella', 'Lucas', 'Mia', 'Jackson'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

// Generate 10 test users
for (let i = 0; i < 10; i++) {
	const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

	const user = {
		_id: `user:${uuidv4()}`,
		type: 'user',
		first_name: firstName,
		last_name: lastName,
		email: email,
		password: '11111',
		phone_number: '123-456-7890',
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		username: ''
	};

	// Save the user to the database
	db.insert(user).then(response => console.log(`Created user: ${response.id}`));
}
