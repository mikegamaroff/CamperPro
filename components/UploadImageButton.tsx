import { useRef } from 'react';
import { useImageUpload } from '../routes/useImageUpload';
import { IconButton } from './Forms/IconButton';
import { IconEye } from './Icons';
export const UploadImageButton: React.FC<{ documentId: string; size?: string }> = ({ documentId }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { loading, uploadImage } = useImageUpload(documentId);

	const imageHandler = () => {
		inputRef.current?.click();
	};

	return (
		<>
			<input
				type="file"
				name="imageUpload"
				ref={inputRef}
				className="hiddenElement"
				onChange={e => uploadImage(e)}
			/>
			<IconButton
				label="Upload Image"
				icon={<span className="iconCircle">{loading ? <>Loading</> : <IconEye />}</span>}
				onClick={imageHandler}
			/>
		</>
	);
};
