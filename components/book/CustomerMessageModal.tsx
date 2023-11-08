import { Container } from '@components/Container';
import { TextArea } from '@components/Forms/TextArea';
import { FormValueType } from '@hooks/useFormValues';
import { Trip } from '@model/trips';
import { useState } from 'react';

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
			<>
				<TextArea
					long={true}
					id="message"
					label="Message"
					inlineImage
					placeholder="Enter your message"
					value={fieldValue}
					rows={4}
					onChange={handleUpdateCustomerMessage}
					/* 		errors={field?.errors && field.errors.length > 0 ? field.errors : []} */
				/>

				<button onClick={handleSubmit}>Submit Message</button>
			</>
		</Container>
	);
};
