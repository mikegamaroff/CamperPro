import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import React from 'react';
import { DescribeIt } from './DescribeIt';
import { HostRules } from './HostRules';
import { WhereIsIt } from './WhereIsIt';

interface StagesProps<T> {
	campsite?: Campsite | null | undefined;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Campsite> | undefined;
	stage: number;
}

// Define an array of your stage components.
// This will just include references to the components, not instances with props.
const stageComponentTypes = [DescribeIt, HostRules, WhereIsIt];

export const STAGE_COUNT = stageComponentTypes.length;

const getStages = (props: StagesProps<Campsite>) => {
	const stageElements = stageComponentTypes.map((Component, index) => <Component {...props} key={index} />);
	return stageElements;
};

export const StageWrapper = (props: StagesProps<Campsite>) => {
	const { stage } = props;
	const stageElements = getStages(props);
	if (stage >= 0 && stage < STAGE_COUNT) {
		return (
			<div style={{ paddingTop: '10px' }}>{React.cloneElement(stageElements[stage], { stage: stage + 1 })}</div>
		);
	}

	return null;
};
