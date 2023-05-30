import React, { useEffect, useRef, useState } from 'react';
import Button from './Forms/Button';
import styles from './ReadMore.module.css';

interface ReadMoreProps {
	text: string;
	textColor?: React.CSSProperties['color'];
	maxLines?: number;
	speed?: number;
	withButton?: boolean;
	expandText?: string;
	collapseText?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
	text,
	textColor,
	expandText = 'Read More »',
	collapseText = '« Read Less »',
	maxLines = 3,
	speed = 0.5,
	withButton = false
}) => {
	const [expanded, setExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(true);
	const textRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (textRef.current) {
			const el: HTMLDivElement = textRef.current;
			el.style.webkitLineClamp = isTruncated ? `${maxLines}` : 'unset';
		}
	}, [isTruncated, maxLines]);

	const toggleExpand = () => {
		if (expanded) {
			setExpanded(false);
			setTimeout(() => setIsTruncated(true), speed * 1000);
		} else {
			setExpanded(true);
			setIsTruncated(false);
		}
	};

	return (
		<div className={styles.container}>
			<div
				ref={textRef}
				className={styles.text}
				style={{
					color: textColor,
					transition: `height ${speed}s ease-in-out`,
					height: expanded ? `${textRef.current?.scrollHeight}px` : `${maxLines * 1.5}em`
				}}
			>
				{text}
			</div>
			{withButton ? (
				<Button onClick={toggleExpand} fill="outline" color="tertiary">
					{expanded ? collapseText : expandText}
				</Button>
			) : (
				<span onClick={toggleExpand} className={styles.readMore}>
					{expanded ? collapseText : expandText}
				</span>
			)}
		</div>
	);
};

export default ReadMore;
