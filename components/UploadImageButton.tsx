import imageCompression from 'browser-image-compression';
import { useRef } from 'react';
import { useImageUpload } from '../routes/useImageUpload';
import { IconButton } from './Forms/IconButton';
import { IconEye } from './Icons';

interface UploadButtonProps<T> {
	documentId: string | undefined;
	size?: string;
	label?: string;
	onSuccess: (data: T) => void;
}

export const UploadImageButton = <T,>({ documentId, onSuccess, label }: UploadButtonProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { loading, uploadImage } = useImageUpload(documentId, onSuccess);

	const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			return;
		}

		const imageFile = e.target.files[0];

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1024,
			useWebWorker: true,
			initialQuality: 0.5,
			checkOrientation: true
		};

		try {
			const compressedFile = await imageCompression(imageFile, options);

			// Create a new File instance and replace it in the FileList
			const compressedFileList = new DataTransfer();
			compressedFileList.items.add(
				new File([compressedFile], compressedFile.name, { type: compressedFile.type })
			);

			// Replace the original FileList with the new one
			const newEvent = new Event(e.type, e);
			Object.defineProperty(newEvent, 'target', {
				writable: false,
				value: { ...e.target, files: compressedFileList.files }
			});

			const result = await uploadImage(newEvent as unknown as React.ChangeEvent<HTMLInputElement>);
			if (result !== null) {
				onSuccess(result);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const imageHandler = () => {
		inputRef.current?.click();
	};

	return (
		<>
			<input type="file" name="imageUpload" ref={inputRef} className="hiddenElement" onChange={uploadHandler} />
			<IconButton
				label={label}
				icon={<span className="iconCircle">{loading ? <>Loading</> : <IconEye />}</span>}
				onClick={imageHandler}
			/>
		</>
	);
};
