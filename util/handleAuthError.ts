import { NextApiResponse } from 'next';

const handleAuthError = (err: any, res: NextApiResponse) => {
	if (err instanceof Error) {
		if (err.message === 'Forbidden') {
			return res.status(403).json({ message: 'Forbidden' });
		} else if (err.message === 'Unauthorized') {
			return res.status(401).json({ message: 'Unauthorized' });
		}
	} else {
		console.error('Unknown error in authenticateJWT:', err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default handleAuthError;
