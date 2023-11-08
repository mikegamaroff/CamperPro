import Button from '@components/Forms/Button';
import { IconCheck, IconMap } from '@components/Icons';
import { TripPic } from '@components/TripPic';
import { UploadImageButton } from '@components/UploadImageButton';
import { ModalContext } from '@context/modalContext';
import { TripContext } from '@context/tripContext';
import { FormValueType, FormValuesType } from '@hooks/useFormValues';
import { Campsite } from '@model/campsite';
import { Trip } from '@model/trips';
import defaultImage from 'assets/defaultCampsite.png';
import classNames from 'classnames';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CustomerMessageModal } from './CustomerMessageModal';
import styles from './RequestToBook.module.css';
// eslint-disable-next-line css-modules/no-unused-class
interface Capacity {
	adults: number;
	children: number;
	pets: number;
}

export const RequestToBook = ({
	trip,
	setValues,
	formValues,
	stage,
	campsite,
	goToNextStage
}: {
	trip?: Trip | null | undefined;
	setValues: (value: FormValueType<Trip>) => void;
	formValues: FormValuesType<Trip> | undefined;
	stage: number;
	campsite: Campsite | null;
	goToNextStage: (page: number) => Promise<void>;
}) => {
	const image = campsite?.images?.[0];
	const [paymentType, setPaymentType] = useState<boolean | undefined>(undefined);
	const { updateTrip } = useContext(TripContext);
	const { openModal, closeModal } = useContext(ModalContext);
	const presentAddMessageModal = () => {
		openModal({
			component: (
				<CustomerMessageModal
					setValues={setValues}
					dismissCustomerMessage={closeModal}
					message={formValues?.message?.value}
				/>
			),
			title: 'Message for the host',
			onCancel: closeModal
		});
	};
	const Dates = (dateString: string) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString('default', { month: 'short' });
		return `${day} ${month}`;
	};

	const getPhotoResult = (val: Trip) => {
		updateTrip(val);
	};

	const Guests = (capacity: Capacity) => {
		const parts = [];

		if (capacity.adults > 0) {
			parts.push(capacity.adults === 1 ? `${capacity.adults} adult` : `${capacity.adults} adults`);
		}

		if (capacity.children > 0) {
			parts.push(capacity.children === 1 ? `${capacity.children} child` : `${capacity.children} children`);
		}

		if (capacity.pets > 0) {
			parts.push(capacity.pets === 1 ? `${capacity.pets} pet` : `${capacity.pets} pets`);
		}

		return parts.join(', ');
	};
	const NightsCalculator = (checkin: string, checkout: string): number => {
		const startDate = new Date(checkin);
		const endDate = new Date(checkout);

		const nightsDifference = endDate.getTime() - startDate.getTime();
		const nights = nightsDifference / (1000 * 60 * 60 * 24);

		return Math.round(nights);
	};
	const Nights = NightsCalculator(trip?.checkin || '', trip?.checkout || '');
	const Price = campsite && campsite.pricePerNight ? Nights * campsite.pricePerNight : null;

	return (
		<div className={styles.container}>
			<div key={'stage2'} className={styles.sections}>
				<h1 className="bold">Request to book</h1>
				<div className="space30" />
				<div className="card">
					<div className={styles.campsitePreview}>
						<div className={styles.campsiteImage}>
							<Image
								src={
									image
										? `/api/images/${image?.id}.${image?.contentType.split('/')[1]}`
										: defaultImage
								}
								alt="Campsite Image"
								fill
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div className={styles.camspiteInfo}>
							<div>Where</div>
							<h5 className={styles.campsiteTitle}>{campsite?.title}</h5>
							<div className="space10"></div>
							<div className={classNames('callout', styles.campsiteDescription)}>
								A nice campsite in the picturesque rocky mountains
							</div>
						</div>
					</div>
				</div>
				<div className="space30" />
				<hr />
				<div className="space20" />
				<div className={styles.editDetails}>
					<div className={styles.smallButton}>Edit Details</div>
				</div>
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Dates</h5>
				<div className="space10" />
				<div>
					{Dates(trip?.checkin || '')} - {Dates(trip?.checkout || '')}
				</div>
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Guests</h5>
				<div className="space10" />
				<div>{Guests(trip?.capacity || { adults: 0, children: 0, pets: 0 })}</div>
				<div className="space20" />
				<hr />
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Price details</h5>
				<div className="space20" />
				<div className={styles.priceInfo}>
					<div>
						${campsite?.pricePerNight} x {Nights} nights
					</div>
					<h4 className={styles.campsitePrice}>${Price}</h4>
				</div>
				<div className="space30" />
				<hr />
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Pay with</h5>
				<div className="space20" />
				<div className={styles.payWithOption}>
					<div className={styles.optionText}>
						<IconMap />
						<div>Credit or debit card</div>
					</div>
					<div className={styles.checkbox} onClick={() => setPaymentType(true)}>
						{paymentType && (
							<div className={styles.checked}>
								<IconCheck size={20} />
							</div>
						)}
					</div>
				</div>
				<div className="space20" />
				<div className={styles.payWithOption}>
					<div className={styles.optionText}>
						<IconMap />
						<div>Paypal</div>
					</div>
					<div className={styles.checkbox} onClick={() => setPaymentType(false)}>
						{paymentType === false && (
							<div className={styles.checked}>
								<IconCheck size={20} />
							</div>
						)}
					</div>
				</div>
				<div className="space30" />
				<hr />
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Last required bits</h5>
				<div className="space30" />
				<div className={styles.profilePhotoInfo}>
					<div>
						<div className="bold">Profile Photo</div>
						<div className="space10" />
						<div className={styles.addPhotoText}>The host wants to know who’s coming.</div>
					</div>
					<div>
						<div className={styles.uploadImageIconContainer}>
							<UploadImageButton<Trip>
								documentId={trip?._id}
								key={uuidv4()}
								onSuccess={getPhotoResult}
								size="small"
							/>
						</div>
						<TripPic trip={trip} size={80} />
					</div>
				</div>
				<div className="space30" />
				<hr />
				<div className="space20" />
				<h5 className={styles.campsiteTitle}>Message for the host?: {trip?.message}</h5>
				<div className="space20" />
				<div className={styles.addInfo}>
					<div className={styles.addMessageText}>
						Special requests or comments directly for the host before you arrive.
					</div>
					<div>
						<div onClick={presentAddMessageModal} className={styles.smallButton}>
							Add
						</div>
					</div>
				</div>
				<div className="space20" />
			</div>
			<div className={styles.greySection}>
				<div className="space30" />
				<h5 className={styles.campsiteTitle}>Host’s rules</h5>
				<div className="space20" />
				<div>{campsite?.rules || 'Hosts Rules'}</div>
				<div className="space30" />
			</div>
			<div className={styles.greySection}>
				<div className="space20" />
				<div className={styles.reservationInfo}>
					<IconMap size={28} />
					<div className="callout">
						Your reservation won’t be confirmed until the host accepts your request (within 24 hours). You
						won’t be charged until then.
					</div>
				</div>
				<div className="space20" />
			</div>
			<div className={styles.greySection}>
				<div className="space20" />
				<div className={classNames(styles.confirmText, 'footnote')}>
					By selecting the button below, I agree to the Host’s Rules. Campr’s rebooking and refund policy, and
					that Campr can charge my payment method if I’m responsible for damage. I agree to pay the total
					amount shown if the Host accepts my booking request. Payment Terms between and Campr Ltd.
				</div>
				<div className="space20" />
			</div>
			<div className="space10" />
			<div className={styles.buttonContainer}>
				<Button
					color="primary"
					fill="solid"
					size="default"
					className="radius8"
					expand="block"
					// onClick={() => goToNextStage(1)}
				>
					Proceed to payment details
				</Button>
			</div>
		</div>
	);
};
