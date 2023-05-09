// users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../model/user';
import createDbInstance from '../../util/camperprodb';

async function getAllUsers(res: NextApiResponse<User[]>) {
	const db = createDbInstance();
	const response = await db.view('user-view', 'all-users');
	const users = response.rows.map(row => row.value as User);
	res.status(200).json(users);
}

async function getUser(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
	const db = createDbInstance();
	const userId = req.query.id || req.query[0];

	try {
		const user = (await db.get(userId as string)) as User;
		res.status(200).json(user);
	} catch (error) {
		console.error('Error retrieving user:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function handler(req: NextApiRequest, res: NextApiResponse<User[] | User | { message: string }>) {
	try {
		if (req.method === 'GET' && !req.query.id) {
			await getAllUsers(res);
		} else if (req.method === 'GET' && req.query.id) {
			await getUser(req, res);
		} else {
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export default handler;
