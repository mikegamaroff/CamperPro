import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import { CampsiteImages } from '../../components/CampsiteImages';
import { Container } from '../../components/Container';
import { IconButton } from '../../components/Forms/IconButton';
import { Header } from '../../components/Header';
import {
	IconBackArrow,
	IconLocation,
	IconMap,
	IconReceptionCheckin,
	IconSelfCheckin,
	IconStar
} from '../../components/Icons';
import { HostedBy } from '../../components/campsites/HostedBy';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
import styles from './campsiteProfile.module.css';

interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);

	const receptionCheckin = campsite?.receptionCheckin;
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
									<p className={styles.pMargin}>{campsite?.rating}</p>
									<div className={styles.dot}>•</div>
									<p className={styles.pMargin}># reviews</p>
								</div>
								<div className={styles.infoLine}>
									<div className={styles.iconContainer}>
										<IconMap size={18} />
									</div>
									<p className={styles.pMargin}>
										{campsite?.location.coordinates.lat}, {campsite?.location.coordinates.lng}
									</p>
								</div>
								{receptionAddress && (
									<div className={styles.infoLine}>
										<div className={styles.iconContainer}>
											<IconLocation size={18} />
										</div>
										<div>
											Reception: {receptionAddress.address1}, {receptionAddress.city},{' '}
											{receptionAddress.state} {receptionAddress.postalCode}
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
						<div className={styles.section}>
							{receptionCheckin && (
								<div className={styles.checkin}>
									<IconReceptionCheckin size={30} />
									<div className={styles.checkinText}>
										<p className={classNames(styles.pMargin, 'bold')}>Reception check-in</p>
										<p className={styles.pMargin}>Meet the owner at the reception.</p>
									</div>
								</div>
							)}
							{!receptionCheckin && (
								<div className={styles.checkin}>
									<IconSelfCheckin size={30} />
									<div className={styles.checkinText}>
										<p className={classNames(styles.pMargin, 'bold')}>Self check-in</p>
										<p className={styles.pMargin}>Check in without meeting the owner.</p>
									</div>
								</div>
							)}
						</div>
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
