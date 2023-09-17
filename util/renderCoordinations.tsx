export const renderCoordinates = (lat: number, lng: number) => {
	return (
		<div title={`${lat}, ${lng}`}>
			{lat.toFixed(4)}, {lng.toFixed(4)}
		</div>
	);
};
