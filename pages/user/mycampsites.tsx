import { Container } from '@components/Container';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconAdd, IconBackArrow } from '@components/Icons';
import { AuthContext } from '@context/authContext';
import { useContext, useEffect, useState } from 'react';
import withAuth from '../withAuth';
import styles from './mycampsites.module.css';
// eslint-disable-next-line css-modules/no-unused-class
import { MyCampsiteItem } from '@components/MyCampsiteItem';
import { Campsite } from '@model/campsite';
import { useAddCampsite } from '@routes/useAddCampsite';
import useDeleteCampsite from '@routes/useDeleteCampsite';
import { useGetAllCampsitesByAuthor } from '@routes/useGetAllCampsites';
import { GoTo } from '@utils/GoTo';
import { createNewCampsite } from '@utils/createNewCampsite';

function MyCampsites() {
	const { user } = useContext(AuthContext);
	const { myCampsites, isLoading } = useGetAllCampsitesByAuthor({ id: user?._id });
	const [drafts, setDrafts] = useState<boolean>(false);
	const { addCampsite } = useAddCampsite();
	const { deleteCampsite, isLoading: deleting } = useDeleteCampsite();
	const handleDeleteCampsite = async (campsite: Campsite) => {
		console.log(campsite);
		const response = await deleteCampsite(campsite?._id ?? '');
		if (response.success) {
			console.log(response);
			// GoTo('/');
		} else {
			console.log(response);
			// Handle error
		}
	};

	const handleAddCampsite = async () => {
		const newCampsite = createNewCampsite(user);
		try {
			const response = await addCampsite(newCampsite);
			if (response.success) {
				GoTo(`/CampsiteEdit/${newCampsite._id}`);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};
	useEffect(() => {
		setDrafts(false);
	}, [myCampsites]);
	return (
		<>
			<Header
				title="My Camspites"
				left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />}
			/>

			<Container scroll>
				<>
					<div className={styles.addCampsiteButton}>
						<IconButton onClick={handleAddCampsite} icon={<IconAdd />} label="Add Campsite" />
					</div>

					<div className="contentWrapper">
						<h2 className="bold">My Campsites</h2>
						<div className="space30" />
						<div className={styles.myCampsiteContainer}>
							{myCampsites?.map(campsite => {
								if (!campsite.draft) {
									return (
										<MyCampsiteItem
											campsite={campsite}
											deleting={deleting}
											key={campsite._id}
											handleDeleteCampsite={handleDeleteCampsite}
										/>
									);
								} else {
									return null;
								}
							})}
						</div>
						<div className="space30" />
						<hr />
						<div className="space30" />
						{drafts && (
							<>
								<h3 className="bold">Drafts</h3>
							</>
						)}
						<div className="space30" />
						<div className={styles.myCampsiteContainer}>
							{myCampsites?.map(campsite => {
								if (campsite.draft) {
									!drafts && setDrafts(true);
									return (
										<MyCampsiteItem
											deleting={deleting}
											campsite={campsite}
											key={campsite._id}
											handleDeleteCampsite={handleDeleteCampsite}
										/>
									);
								} else {
									return null;
								}
							})}
							<div className="space10" />
						</div>
					</div>
				</>
			</Container>
		</>
	);
}

export default withAuth(MyCampsites);
