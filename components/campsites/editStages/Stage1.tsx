import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import React from 'react';

interface StageProps<T> {
	campsite?: Campsite | null | undefined;
	setValues: (value: FormValueType<T>) => void;
	formValues: FormValuesType<Campsite> | undefined;
}

export const Stage1: React.FC<StageProps<Campsite>> = ({ campsite }) => {
	return (
		<>
			<div>Fart</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>{campsite?.draftStage}</div>
			<div>GG</div>
			<div>GGG</div>
			<div>GGGG</div>
			<div>GGGGG</div>
			<div>GGGGGG</div>
			<div>GGGGGGG</div>
			<div>GGGGGGGG</div>
			<div>GGGGGGGGG</div>
			<div>GGGGGGGGGG</div>
			<div>GGGGGGGGGGG</div>
			<div>GGGGGGGGGGGG</div>
			<div>GGGGGGGGGGGGG</div>
			<div>GG</div>
			<div>GGG</div>
			<div>GGGG</div>
			<div>GGGGG</div>
			<div>GGGGGG</div>
			<div>GGGGGGG</div>
			<div>GGGGGGGG</div>
			<div>555555555</div>
			<div>66666666666</div>
			<div>7777777777</div>
			<div>88888888888</div>
			<div>999999999999</div>
		</>
	);
};
