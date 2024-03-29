import { AuthContext } from '@context/authContext';
import { useGlobalToast } from '@context/toastContext';
import { useCallback, useContext, useState } from 'react';

export function useImageUpload<T = any>(
	document: string | undefined,
	updateFunction: (data: T) => void
): {
	loading: boolean;
	uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<T | null>;
} {
	// Loading is true while the image is uploading.
	const [loading, setLoading] = useState(false);
	const { showToast } = useGlobalToast();
	const { status } = useContext(AuthContext); // Access user and status from the AuthContext
	const uploadImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			return new Promise<T | null>((resolve, reject) => {
				const file: Blob | undefined = e?.target?.files?.[0];

				if (file && document && status === 'authenticated') {
					// Check if the user is authenticated
					const reader = new FileReader();

					reader.onload = (event: ProgressEvent<FileReader>) => {
						if (!event.target?.result) {
							console.error("Couldn't read image data");
							// eslint-disable-next-line prefer-promise-reject-errors
							reject("Couldn't read image data");
							return; // exit early if event.target is null
						}

						setLoading(true);
						fetch('/api/images', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Include the JWT in the Authorization header
							},
							body: JSON.stringify({
								documentId: document,
								data: Array.from(new Uint8Array(event.target.result as ArrayBuffer)),
								contentType: file.type
							})
						})
							.then(async response => {
								if (response.ok) {
									const data: T = await response.json();
									setLoading(false);

									showToast('success', 'Image uploaded.');
									updateFunction(data);
									resolve(data);
								} else {
									setLoading(false);
									const badResult = await response.json();
									showToast('error', 'Error uploading image:' + badResult);
									console.error('Error uploading image:', badResult);
									reject(badResult);
								}
							})
							.catch(error => {
								setLoading(false);
								console.error('Error uploading image:', error);
								reject(error);
							});
					};

					reader.readAsArrayBuffer(file);
				} else {
					resolve(null);
				}
			});
		},
		[document, showToast, setLoading, status] // Include status in the dependency array
	);

	return { loading, uploadImage };
}
