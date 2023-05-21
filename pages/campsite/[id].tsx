import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DotIndicator } from '../../components/DotIndicator';
import { Header } from '../../components/Header';
import { MenuButton } from '../../components/MenuButton';
import { useGetCampsite } from '../../routes/useGetCampsite';
import withAuth from '../withAuth';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../../styles/shared.module.css';
interface PostPageProps {
	id: string;
}

const Campsite: React.FC<PostPageProps> = ({ id }) => {
	const { campsite } = useGetCampsite(id);
	const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const handleSlideChange = (swiper: SwiperCore) => {
		const index = swiper.activeIndex;
		setCurrentImageIndex(index);
	};
	const handleClick = (index: number) => {
		swiperInstance?.slideTo(index);
	};
	useEffect(() => {
		if (swiperInstance) {
			swiperInstance.update();
		}
	}, [campsite, swiperInstance]);
	return (
		<>
			<Header title="logo" left={<MenuButton />} />

			<div>
				<Swiper
					spaceBetween={10}
					slidesPerView={1}
					onSlideChange={handleSlideChange}
					onSwiper={setSwiperInstance}
					className={sharedStyles.imageContainer}
				>
					{campsite && campsite?.images?.length > 1 && (
						<div className={sharedStyles.imageTracker}>
							{campsite?.images.map((image, index) => (
								<div
									key={index}
									onClick={() => handleClick(index)}
									className={sharedStyles.imageTrackerDot}
								>
									<DotIndicator on={currentImageIndex === index} />
								</div>
							))}
						</div>
					)}
					{campsite?.images?.slice(0, 6).map((image, index) => (
						<SwiperSlide key={index}>
							<div className={`${sharedStyles.campsiteImage}`}>
								<img
									src={`/api/images/${image.id}.${image.contentType.split('/')[1]}`}
									alt={`${campsite?.title} - Slide ${index + 1}`}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<h1>{campsite?.title}</h1>
			</div>
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
