import { User } from '@model/user';
import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface NextApiRequestWithUser extends NextApiRequest {
	user?: User;
}

const authenticateJWT = async (req: NextApiRequestWithUser): Promise<User> => {
	return new Promise((resolve, reject) => {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, JWT_SECRET, (err, user) => {
				if (err) {
					reject(new Error('Forbidden'));
				}
				req.user = user as User;
				resolve(req.user);
			});
		} else {
			reject(new Error('Unauthorized'));
		}
	});
};

export default authenticateJWT;
