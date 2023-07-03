// hooks/useGetAllCampsites.ts
import { CampsiteContext } from '@context/campsiteContext';
import { CampsiteFilter } from '@model/campsite';
import { useContext, useEffect, useState } from 'react';

interface GetAllCampsiteProps {
	view?: string;
	filters?: CampsiteFilter | null;
}

export const useGetAllCampsites = ({ view = 'non-draft-campsites', filters }: GetAllCampsiteProps = {}) => {
	const { campsites, setCampsites } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const getAllCampsites = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/campsites?view=${view}&filters=${encodeURIComponent(JSON.stringify(filters))}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				}
			);

			if (response.ok) {
				const data = await response.json();
				setCampsites(data.campsites);
				setLoading(false);
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
		}
	};

	useEffect(() => {
		getAllCampsites();
	}, [filters]); // Update whenever filters changes

	return { campsites, isLoading, isError };
};

interface Location {
	state: string;
	nearestTown: string;
}

export const useGetAllCampsiteLocations = ({ view = 'non-draft-campsites', filters }: GetAllCampsiteProps = {}) => {
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const [locations, setLocations] = useState<Location[]>([]);

	const getAllCampsiteLocations = async () => {
		// If no filters provided or filters.searchLocation is not set, return early
		if (!filters || !filters.searchLocation) {
			setLocations([]); // Clear any previous locations
			setLoading(false);
			return;
		}

		setLoading(true);
		setError(null);
		console.log(filters);
		try {
			const response = await fetch(
				`/api/campsites?view=${view}&filters=${encodeURIComponent(JSON.stringify(filters))}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				}
			);

			if (response.ok) {
				const data = await response.json();
				// Set locations, extracting only the location information from each campsite
				setLocations(data.campsites.map((campsite: any) => campsite.location));
				setLoading(false);
			} else {
				const errorData = await response.json();
				setLoading(false);
				setError(errorData.message);
			}
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError('Internal server error');
		}
	};

	useEffect(() => {
		getAllCampsiteLocations();
	}, [filters]); // Update whenever filters changes

	return { locations, isLoading, setLocations, isError };
};

interface GetAllCampsiteByUserProps {
	id?: string;
}

export const useGetAllCampsitesByAuthor = ({ id }: GetAllCampsiteByUserProps) => {
	const { myCampsites, setMyCampsites } = useContext(CampsiteContext);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState<string | null>();
	const getAllCampsitesByAuthor = async () => {
		setLoading(true);
		setError(null);
		if (id) {
			try {
				const response = await fetch(`/api/campsites?view=all-campsites-by-author&author=${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					setMyCampsites(data.campsites);
					setLoading(false);
				} else {
					const errorData = await response.json();
					setLoading(false);
					setError(errorData.message);
				}
			} catch (error) {
				console.error(error);
				setLoading(false);
				setError('Internal server error');
			}
		}
	};

	useEffect(() => {
		getAllCampsitesByAuthor();
	}, []);

	return { myCampsites, isLoading, isError };
};
