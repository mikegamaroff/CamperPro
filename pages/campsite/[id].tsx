import { GetServerSideProps } from 'next';
import { CampsiteImages } from '../../components/CampsiteImages';
import { Container } from '../../components/Container';
import { IconButton } from '../../components/Forms/IconButton';
import { Header } from '../../components/Header';
import { IconBackArrow, IconLocation, IconMap, IconStar } from '../../components/Icons';
import { CheckinType } from '../../components/campsites/CheckinType';
import { HostedBy } from '../../components/campsites/HostedBy';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
import styles from './campsiteProfile.module.css';

interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);

	const receptionAddress = campsite?.location.receptionAddress;

	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container scroll>
				<>
					<CampsiteImages campsite={campsite} />
					<div className="contentWrapper">
						<div className={styles.section}>
							<h2 className="bold">{campsite?.title}</h2>
							<div className={styles.info}>
								<div className={styles.infoLine}>
									<div className={styles.iconContainer}>
										<IconStar size={18} />
									</div>
									<div>{campsite?.rating}</div>
									<div className={styles.dot}>•</div>
									<div># reviews</div>
								</div>
								<div className={styles.infoLine}>
									<div className={styles.iconContainer}>
										<IconMap size={18} />
									</div>
									<div>
										{campsite?.location.coordinates.lat}, {campsite?.location.coordinates.lng}
									</div>
								</div>
								{receptionAddress && (
									<div className={styles.infoLine}>
										<div className={styles.iconContainer}>
											<IconLocation size={18} />
										</div>
										<div>
											Reception: {receptionAddress.address1}, {receptionAddress.city},{' '}
											{campsite?.location.state} {receptionAddress.postalCode}
										</div>
									</div>
								)}
							</div>
						</div>
						<hr />
						{campsite && (
							<div className={styles.section}>
								<HostedBy campsite={campsite} />
							</div>
						)}
						<hr />
						{campsite && (
							<div className={styles.section}>
								<CheckinType campsite={campsite} />
							</div>
						)}
						<hr />
					</div>
				</>
			</Container>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const { params } = context;

	// Ensure that the id param is a string before we pass it as a prop
	const id = typeof params?.id === 'string' ? params.id : '';

	return {
		props: {
			id
		}
	};
};
export default withAuth(Campsite);
