// users.ts
import { User } from '@model/user';
import authenticateJWT from '@utils/authenticateJSW';
import createDbInstance from '@utils/camperprodb';
import handleAuthError from '@utils/handleAuthError';
import { NextApiRequest, NextApiResponse } from 'next';

async function getUser(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const userId = req.query.id as string;

		// Check if the id starts with 'user'
		if (!userId.startsWith('user')) {
			res.status(500).json({ message: 'User not found' });
			return;
		}

		const doc = (await db.get(userId)) as User;

		// Check if the doc type is 'user'
		if (doc.type !== 'user') {
			res.status(500).json({ message: 'User not found' });
			return;
		}

		const user = doc as User;
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
