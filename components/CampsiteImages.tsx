import { FC, useState } from 'react';
import { Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Campsite } from '../model/campsite';
import { DotIndicator } from './DotIndicator';
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyles from '../styles/shared.module.css';

interface CampsiteImageProps {
	campsite?: Campsite;
}

export const CampsiteImages: FC<CampsiteImageProps> = ({ campsite }) => {
	const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const images = campsite?.images;
	const handleSlideChange = (swiper: SwiperCore) => {
		const index = swiper.activeIndex;
		setCurrentImageIndex(index);
	};
	const handleClick = (index: number) => {
		swiperInstance?.slideTo(index);
	};

	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={1}
			onSlideChange={handleSlideChange}
			onSwiper={setSwiperInstance}
			className={sharedStyles.imageContainer}
		>
			{images && images.length > 1 && (
				<div className={sharedStyles.imageTracker}>
					{images.map((image, index) => (
						<div key={index} onClick={() => handleClick(index)} className={sharedStyles.imageTrackerDot}>
							<DotIndicator on={currentImageIndex === index} />
						</div>
					))}
				</div>
			)}
			{images &&
				images.slice(0, 6).map((image, index) => (
					<SwiperSlide key={index}>
						<div className={`${sharedStyles.containedImage}`}>
							<img
								src={`/api/images/${image.id}.${image.contentType.split('/')[1]}`}
								alt={`${campsite?.title} - Slide ${index + 1}`}
							/>
						</div>
					</SwiperSlide>
				))}
		</Swiper>
	);
};
