import { Container } from '@components/Container';
import { TextArea } from '@components/Forms/TextArea';
import { FormValueType } from '@hooks/useFormValues';
import { Trip } from '@model/trips';
import { useState } from 'react';
import styles from './CustomerMessageModal.module.css';

interface CustomerMessageType<T> {
	setValues: (value: FormValueType<T>) => void;
	dismissCustomerMessage: () => void;
	message?: string;
}

export const CustomerMessageModal = ({ setValues, dismissCustomerMessage, message }: CustomerMessageType<Trip>) => {
	const [fieldValue, setFieldValue] = useState<string | undefined>(message);

	const handleUpdateCustomerMessage = (e: any) => {
		setFieldValue(e.target.value);
	};
	const handleSubmit = () => {
		setValues({ message: fieldValue });
		dismissCustomerMessage();
	};

	return (
		<Container scroll hidetabs shelfHeight={40}>
			<div className={styles.container}>
				<TextArea
					long={true}
					id="message"
					inlineImage
					placeholder="Enter your message"
					value={fieldValue}
					rows={4}
					onChange={handleUpdateCustomerMessage}
					/* 		errors={field?.errors && field.errors.length > 0 ? field.errors : []} */
				/>

				<button className={styles.submitButton} onClick={handleSubmit}>
					Submit Message
				</button>
			</div>
		</Container>
	);
};
