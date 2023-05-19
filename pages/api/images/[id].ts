import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const id = req.query.id as string;

	const imagePath = path.join(process.cwd(), 'uploads', 'images', `${id}`);
	if (fs.existsSync(imagePath)) {
		const imageData = fs.readFileSync(imagePath);
		const imageExtension = id.split('.').pop(); // Extract the extension from the id
		const contentType = `image/${imageExtension}`; // Construct the Content-Type string

		res.setHeader('Content-Type', contentType);
		res.end(imageData, 'binary');
	} else {
		res.status(404).send('Image not found');
	}
}
