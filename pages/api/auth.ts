// pages/api/auth.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../model/user';
import createDbInstance from '../../util/camperprodb';
import { isCouchDbError } from '../../util/isCouchDbError';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Replace 'your_secret_key' with a strong secret key

async function registerUser(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
	const db = createDbInstance();
	const newUser: User = req.body;
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Hash the user's password before inserting it into the database
	const salt = bcrypt.genSaltSync(10);
	newUser.password = bcrypt.hashSync(newUser.password, salt);

	try {
		const response = await db.insert(newUser);
		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({ message: 'Internal server error' });
		} else {
			res.status(201).json({ message: `User registered with ID: ${response.id}` });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function authenticateUser(req: NextApiRequest, res: NextApiResponse<{ token: string } | { message: string }>) {
	const db = createDbInstance();
	const { email, password } = req.body;

	try {
		const response = await db.view('user-view', 'all-users', {
			key: email
		});
		const user = response.rows[0]?.value as User;

		console.log('Plain text password:', password);
		if (!user || !bcrypt.compareSync(password, user.password)) {
			res.status(401).json({ message: 'Invalid email or password' });
			return;
		}

		const payload = {
			id: user._id,
			email: user.email
		};

		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
		res.status(200).json({ token });
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse<{ token: string } | { message: string }>) {
	try {
		if (req.method === 'POST' && req.query.action === 'register') {
			await registerUser(req, res);
		} else if (req.method === 'POST' && req.query.action === 'login') {
			await authenticateUser(req, res);
		} else {
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export default handler;
