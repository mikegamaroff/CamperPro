import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import React from 'react';

interface StageProps<T> {
	campsite?: Campsite;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Campsite> | undefined;
}

export const Stage1: React.FC<StageProps<Campsite>> = ({ campsite }) => {
	return <div>{campsite?.draftStage}</div>;
};
