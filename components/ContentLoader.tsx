import { ReactNode } from 'react';
import { ContentPreloader } from './ContentPreloader';

interface QuirkLoaderProps {
	loadingMessage?: string;
	isLoading: boolean;
	data: any;
	noResults: JSX.Element;
	children: ReactNode;
}

export const ContentLoader = ({ loadingMessage, isLoading, data, noResults, children }: QuirkLoaderProps) => {
	const isEmpty = Array.isArray(data) ? data.length === 0 : data === null || data === undefined;

	return (
		<>
			{isLoading ? (
				<ContentPreloader message={loadingMessage || 'Loading...'} />
			) : isEmpty ? (
				<>{noResults}</>
			) : (
				<>{children}</>
			)}
		</>
	);
};
