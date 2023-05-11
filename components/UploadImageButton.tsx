import { useRef } from 'react';

import { useImageUpload } from '../routes/useImageUpload';
import { IconButton } from './Forms/IconButton';
import { IconEye } from './Icons';
interface UploadButtonProps<T> {
	documentId: string | undefined;
	size?: string;
	label?: string;
	onSuccess: (updatedDocument: T) => void;
}

export const UploadImageButton = <T,>({ documentId, onSuccess, label }: UploadButtonProps<T>) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { loading, uploadImage } = useImageUpload(documentId);

	const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const result = await uploadImage(e);
		onSuccess(result);
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
