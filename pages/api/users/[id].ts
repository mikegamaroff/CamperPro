// users.ts
import { User } from '@model/user';
import authenticateJWT from '@utils/authenticateJSW';
import createDbInstance from '@utils/camperprodb';
import handleAuthError from '@utils/handleAuthError';
import { isCouchDbError } from '@utils/isCouchDbError';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserResponse {
	message: string;
	user?: User;
}
interface UserUpdateResponse {
	message: string;
	user?: User;
}
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

async function updateUser(req: NextApiRequest, res: NextApiResponse<UserUpdateResponse>) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const userId = req.query.id as string;
		const updatedUser: User = req.body;

		if (!updatedUser._id || !updatedUser._rev) {
			res.status(400).json({ message: 'Missing id or rev in request body' });
			return;
		}

		if (updatedUser._id !== userId) {
			res.status(400).json({ message: 'User id in the URL and in the body do not match' });
			return;
		}

		const response = await db.insert(updatedUser);

		if (isCouchDbError(response)) {
			console.error('CouchDB error:', response);
			res.status(500).json({
				message: 'Internal server error'
			});
		} else {
			res.status(200).json({ message: `User updated with ID: ${response.id}`, user: updatedUser });
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse<User | UserResponse>) {
	try {
		await authenticateJWT(req);
		switch (req.method) {
			case 'GET':
				await getUser(req, res);
				break;
			case 'PUT':
				await updateUser(req, res);
				break;
			default:
				res.setHeader('Allow', ['GET', 'PUT']);
				res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (err) {
		handleAuthError(err, res);
	}
}

export default handler;
