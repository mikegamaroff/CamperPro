import { useCallback, useState } from 'react';
import { useGlobalToast } from '../context/toastContext';

export function useImageUpload(document: string): {
	loading: boolean;
	uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
} {
	// Loading is true while the image is uploading.
	const [loading, setLoading] = useState(false);
	const { showToast } = useGlobalToast();

	const uploadImage = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const file: Blob | undefined = e?.target?.files?.[0];

			if (file && document) {
				const reader = new FileReader();

				reader.onload = async (event: ProgressEvent<FileReader>) => {
					if (!event.target?.result) {
						console.error("Couldn't read image data");
						return;
					}

					try {
						setLoading(true);
						const response = await fetch('/api/images', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								documentId: document,
								data: Array.from(new Uint8Array(event.target.result as ArrayBuffer)),
								contentType: file.type
							})
						});

						if (response.ok) {
							const data = await response.json();
							setLoading(false);
							console.log(data);
							// Handle the uploaded image URL, e.g., store it in the post object
						} else {
							setLoading(false);
							console.error('Error uploading image:', await response.json());
						}
					} catch (error) {
						setLoading(false);
						console.error('Error uploading image:', error);
					}
				};

				reader.readAsArrayBuffer(file);
			}
		},
		[document]
	);

	return { loading, uploadImage };
}
