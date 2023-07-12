interface NoResultsProps {
	heading?: string;
	subheading?: string;
	icon?: JSX.Element;
	children?: JSX.Element;
}

export const NoResults = ({ heading, subheading, icon, children }: NoResultsProps) => {
	const innerConent = (
		<div className="center">
			<div className="space40" />
			{icon}
			<div className="space20" />
			<h4>{heading || 'No results.'}</h4>
			<p>{subheading || 'No results.'}</p>
			{children}
		</div>
	);

	return <>{innerConent}</>;
};
