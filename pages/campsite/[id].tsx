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
	IconProfile,
	IconReceptionCheckin,
	IconSelfCheckin,
	IconStar
} from '../../components/Icons';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
import styles from './id.module.css';

interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite, isLoading } = useGetCampsite(id);
	const receptionCheckin = campsite?.receptionCheckin;

	return (
		<>
			<Header title="logo" left={<IconButton icon={<IconBackArrow />} onClick={() => history.go(-1)} />} />

			<Container scroll>
				<>
					<CampsiteImages campsite={campsite} />
					<div className={styles.container}>
						<div className={styles.section}>
							<h2 className="bold">{campsite?.title}</h2>
							<div className={styles.info}>
								<div className={styles.infoLine}>
									<IconStar size={18} />
									<p className={styles.pMargin}>{campsite?.rating}</p>
									<div className={styles.dot} />
									<p className={styles.pMargin}># reviews</p>
								</div>
								<div className={styles.infoLine}>
									<IconMap size={18} />
									<p className={styles.pMargin}>
										{campsite?.location.coordinates.lat}, {campsite?.location.coordinates.lng}
									</p>
								</div>
								<div className={styles.infoLine}>
									<IconLocation size={18} />
									{receptionCheckin && (
										<p style={{ marginBottom: '0px', color: 'var(--neutral700)' }}>
											Reception: {campsite?.location.receptionAddress.address1},{' '}
											{campsite?.location.receptionAddress.city},{' '}
											{campsite?.location.receptionAddress.state}{' '}
											{campsite?.location.receptionAddress.postalCode}
										</p>
									)}
									{!receptionCheckin && (
										<p style={{ marginBottom: '0px', color: 'var(--neutral700)' }}>
											Campsite: {campsite?.location.receptionAddress.address1},{' '}
											{campsite?.location.receptionAddress.city},{' '}
											{campsite?.location.receptionAddress.state}{' '}
											{campsite?.location.receptionAddress.postalCode}
										</p>
									)}
								</div>
							</div>
						</div>
						<div className={styles.divideLine} />
						<div className={styles.section}>
							<div className={styles.hostedBy}>
								<div className={styles.host}>
									<h3 className="bold">Hosted by:</h3>
									<h5>{campsite?.author}</h5>
								</div>
								<div className={styles.profile}>
									<IconProfile size={35} />
								</div>
							</div>
							<div className={styles.infoLine}>
								<p className={styles.pMargin}>{campsite?.capacity.numberOfTentSites} tent sites</p>
								<div className={styles.smallDot} />
								<p className={styles.pMargin}>{campsite?.capacity.acreage} acres</p>
							</div>
						</div>
						<div className={styles.divideLine} />
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
						<div className={styles.divideLine} />
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
