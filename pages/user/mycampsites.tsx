import { Container } from '@components/Container';
import { IconButton } from '@components/Forms/IconButton';
import { Header } from '@components/Header';
import { IconAdd, IconBackArrow } from '@components/Icons';
import { AuthContext } from '@context/authContext';
import defaultImage from 'assets/defaultCampsite.png';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import withAuth from '../withAuth';
import styles from './mycampsites.module.css';
// eslint-disable-next-line css-modules/no-unused-class
import Button from '@components/Forms/Button';
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
	const [draftCampsites, setDraftCampsites] = useState<Campsite[]>([]);
	const [nonDraftCampsites, setNonDraftCampsites] = useState<Campsite[]>([]);

	const { addCampsite } = useAddCampsite();
	const { deleteCampsite, isLoading: deleting } = useDeleteCampsite();

	useEffect(() => {
		const drafts = myCampsites?.filter(campsite => campsite.draft) || [];
		const nonDrafts = myCampsites?.filter(campsite => !campsite.draft) || [];

		setDraftCampsites(drafts);
		setNonDraftCampsites(nonDrafts);
	}, [myCampsites]);

	const handleDeleteCampsite = async (campsite: Campsite) => {
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
				GoTo(`/campsite/edit/${newCampsite._id}`);
			} else {
				console.error('Error adding campsite:', response.message);
			}
		} catch (error) {
			console.error('Error adding campsite:', error instanceof Error ? error.message : 'Unknown error');
		}
	};

	return (
		<>
			<Header
				title="My Camspites"
				left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />}
			/>

			<Container scroll>
				<>
					<div className="contentWrapper">
						{(draftCampsites.length > 0 || nonDraftCampsites.length > 0) && (
							<>
								<div className={styles.addCampsiteButton}>
									<IconButton
										onClick={handleAddCampsite}
										icon={<IconAdd />}
										label="Host a Campsite"
									/>
								</div>
								<h2 className="bold">My Campsites</h2>
								<div className="space30" />
							</>
						)}

						{nonDraftCampsites.length > 0 && (
							<>
								<div className={styles.myCampsiteContainer}>
									{nonDraftCampsites?.map(campsite => (
										<MyCampsiteItem
											key={campsite._id}
											campsite={campsite}
											deleting={deleting}
											handleDeleteCampsite={handleDeleteCampsite}
										/>
									))}
								</div>
								<div className="space30" />
							</>
						)}
						{draftCampsites.length > 0 && nonDraftCampsites.length > 0 && (
							<>
								<hr />
								<div className="space30" />
							</>
						)}
						{draftCampsites.length > 0 && (
							<>
								<h3 className="bold">Drafts</h3>
								<div className="space30" />
								<div className={styles.myCampsiteContainer}>
									{draftCampsites?.map(campsite => (
										<MyCampsiteItem
											key={campsite._id}
											deleting={deleting}
											campsite={campsite}
											handleDeleteCampsite={handleDeleteCampsite}
										/>
									))}
									<div className="space10" />
								</div>
							</>
						)}
						{draftCampsites.length === 0 && nonDraftCampsites.length === 0 && (
							<div className={styles.noCampsiteContainer}>
								<div className="space10" />
								<div className={styles.noCampsitesImage}>
									<Image
										src={defaultImage}
										alt="Campsite Image"
										fill
										style={{ objectFit: 'cover' }}
									/>
								</div>
								<div className="space10" />
								<h3>{`You're not hosting yet.`}</h3>
								<div className="space30" />
								<Button size="large" expand="block" onClick={handleAddCampsite} tabIndex={3}>
									Host a campsite
								</Button>
							</div>
						)}
					</div>
				</>
			</Container>
		</>
	);
}

export default withAuth(MyCampsites);
