import { useCallback, useState } from 'react';
import { useGlobalToast } from '../context/toastContext';

export function useImageUpload<T = any>(
	document: string | undefined
): {
	loading: boolean;
	uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<T | null>;
} {
	// Loading is true while the image is uploading.
	const [loading, setLoading] = useState(false);
	const { showToast } = useGlobalToast();

	const uploadImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			return new Promise<T | null>((resolve, reject) => {
				const file: Blob | undefined = e?.target?.files?.[0];

				if (file && document) {
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
								'Content-Type': 'application/json'
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
		[document, showToast, setLoading]
	);

	return { loading, uploadImage };
}
