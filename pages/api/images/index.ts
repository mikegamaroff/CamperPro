import { DocumentWithImages } from '@model/model';
import { User } from '@model/user';
import authenticateJWT from '@utils/authenticateJSW';
import createDbInstance from '@utils/camperprodb';
import handleAuthError from '@utils/handleAuthError';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '10mb' // Increase the limit to a desired value, e.g. 10 MB
		}
	}
};

interface NextApiRequestWithUser extends NextApiRequest {
	user?: User;
}
async function uploadImage(
	req: NextApiRequestWithUser,
	res: NextApiResponse<DocumentWithImages | { message: string }>
) {
	try {
		await authenticateJWT(req);
		const db = createDbInstance();
		const { documentId, data, contentType } = req.body;

		// Generate a unique filename for the uploaded image
		const imageId = uuidv4();
		const imageExtension = contentType.split('/')[1];
		const imagePath = path.join(process.cwd(), 'uploads', 'images', `${imageId}.${imageExtension}`);

		// Save the image to the server
		fs.writeFileSync(imagePath, Buffer.from(data), 'binary');

		// Update the post object in CouchDB with the image reference
		try {
			const doc = (await db.get(documentId)) as DocumentWithImages;
			doc.images = doc.images || [];
			if (doc.type === 'user') {
				doc.images = [{ id: imageId, contentType }];
			} else {
				doc.images.push({ id: imageId, contentType });
			}

			const response = await db.insert(doc);

			// Now that the document is updated, get it back from the database
			const updatedDoc = await db.get(response.id);

			res.status(200).json(updatedDoc as DocumentWithImages);
		} catch (error) {
			console.error('Error updating document with image reference:', error);
			const couchDbError = error as { statusCode?: number; message?: string };
			if (couchDbError.statusCode === 404) {
				res.status(404).json({ message: `Document not found: ${documentId}` });
			} else {
				res.status(500).json({ message: `Internal server error: ${couchDbError.message}` });
			}
		}
	} catch (err) {
		handleAuthError(err, res);
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse<DocumentWithImages | { message: string }>) {
	if (req.method === 'POST') {
		await uploadImage(req, res);
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

export default handler;
