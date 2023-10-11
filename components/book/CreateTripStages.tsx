import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { Trip } from '@model/trips';
import React from 'react';
import { PlanTrip } from './PlanTrip';
import { RequestToBook } from './RequestToBook';

interface CreateTripStagesProps<T> {
	trip?: Trip | null | undefined;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Trip> | undefined;
	stage: number;
	campsite: Campsite;
	goToNextStage: (page: number) => Promise<void>;
	handleAddTrip: () => Promise<void>;
}

// Define an array of your stage components.
// This will just include references to the components, not instances with props.
const stageComponentTypes = [PlanTrip, RequestToBook];

export const CREATE_TRIP_PAGE_TRIP = stageComponentTypes.length;

const getStages = (props: CreateTripStagesProps<Trip>) => {
	const stageElements = stageComponentTypes.map((Component, index) => <Component {...props} key={index} />);
	return stageElements;
};

export const CreateTripStages = (props: CreateTripStagesProps<Trip>) => {
	const { stage } = props;
	const stageElements = getStages(props);
	if (stage >= 0 && stage < CREATE_TRIP_PAGE_TRIP) {
		return (
			<div style={{ paddingTop: '10px' }}>{React.cloneElement(stageElements[stage], { stage: stage + 1 })}</div>
		);
	}

	return null;
};
