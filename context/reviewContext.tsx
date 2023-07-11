// reviewContext.tsx
import React, { ReactNode, createContext, useState } from 'react';
import { Review } from '../model/review';

interface ReviewContextInterface {
	reviews: Review[];
	setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export const ReviewContext = createContext<ReviewContextInterface>({
	reviews: [],
	setReviews: () => {}
});

interface ReviewProviderProps {
	children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
	const [reviews, setReviews] = useState<Review[]>([]);
	console.log(reviews);
	return <ReviewContext.Provider value={{ reviews, setReviews }}>{children}</ReviewContext.Provider>;
};
