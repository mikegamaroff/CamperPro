// users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../model/user';
import authenticateJWT from '../../../util/authenticateJSW';
import createDbInstance from '../../../util/camperprodb';
import handleAuthError from '../../../util/handleAuthError';

async function getUser(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const userId = req.query.id as string;
		const user = (await db.get(userId as string)) as User;
		res.status(200).json(user);
	} catch (error) {
		console.error('Error retrieving user:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
async function handler(req: NextApiRequest, res: NextApiResponse<User[] | User | { message: string }>) {
	try {
		await authenticateJWT(req);
		try {
			if (req.method === 'GET') {
				await getUser(req, res);
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
