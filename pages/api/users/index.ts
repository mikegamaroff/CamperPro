// users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../model/user';
import authenticateJWT from '../../../util/authenticateJSW';
import createDbInstance from '../../../util/camperprodb';
import handleAuthError from '../../../util/handleAuthError';

async function getAllUsers(req: NextApiRequest, res: NextApiResponse<User[] | { message: string }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const response = await db.view('user-view', 'all-users');
		const users = response.rows.map(row => row.value as User);
		res.status(200).json(users);
	} catch (err) {
		handleAuthError(err, res);
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse<User[] | User | { message: string }>) {
	try {
		await authenticateJWT(req);
		try {
			if (req.method === 'GET') {
				await getAllUsers(req, res);
			} else {
				res.setHeader('Allow', ['GET', 'POST']);
				res.status(405).end(`Method ${req.method} Not Allowed`);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	} catch (err) {
		handleAuthError(err, res);
	}
}

export default handler;
