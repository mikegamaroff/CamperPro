import { Attributes, FilterIDType } from '@model/campsite';
import { selectAttributeFilter } from '@utils/selectAttributeFilter';
import { useState } from 'react';

const useSelectAttributes = () => {
	const [selectedAttributes, setUpdatedAttributes] = useState<Attributes>();
	const handleSelectAttributes = (id: FilterIDType) => {
		const updatedAttributes: Attributes | undefined = selectAttributeFilter(selectedAttributes, id);
		setUpdatedAttributes(updatedAttributes);
	};

	return { selectedAttributes, handleSelectAttributes };
};

export default useSelectAttributes;
