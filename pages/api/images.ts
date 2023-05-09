import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DocumentWithImages } from '../../model/model';
import createDbInstance from '../../util/camperprodb';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb' // Increase the limit to a desired value, e.g. 10 MB
		}
	}
};
async function uploadImage(req: NextApiRequest, res: NextApiResponse<{ imageUrl: string } | { message: string }>) {
	const db = createDbInstance();
	const { documentId, data, contentType } = req.body;

	// Generate a unique filename for the uploaded image
	const imageId = uuidv4();
	const imagePath = path.join(process.cwd(), 'public', 'images', `${imageId}.jpg`);

	// Save the image to the server
	fs.writeFileSync(imagePath, Buffer.from(data), 'binary');

	// Update the post object in CouchDB with the image reference
	try {
		const doc = (await db.get(documentId)) as DocumentWithImages;
		doc.images = doc.images || [];
		doc.images.push({ id: imageId, contentType });
		await db.insert(doc);

		res.status(200).json({ imageUrl: `/images/${imageId}.jpg` });
	} catch (error) {
		console.error('Error updating document with image reference:', error);
		const couchDbError = error as { statusCode?: number; message?: string };
		if (couchDbError.statusCode === 404) {
			res.status(404).json({ message: `Document not found: ${documentId}` });
		} else {
			res.status(500).json({ message: `Internal server error: ${couchDbError.message}` });
		}
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse<{ imageUrl: string } | { message: string }>) {
	if (req.method === 'POST') {
		await uploadImage(req, res);
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

export default handler;
