// TypeScript utility function to return a random synonym for adventure
export const getRandomAdventureSynonym = (): string => {
	const adventureSynonyms: string[] = [
		'expedition',
		'escapade',
		'odyssey',
		'thrill',
		'escapade',
		'outing',
		'jaunt',
		'romp',
		'foray',
		'adventure',
		'excursion',
		'escape',
		'thrill',
		'trip'
	];

	if (adventureSynonyms.length === 0) {
		throw new Error('Array of synonyms must not be empty.');
	}

	const randomIndex = Math.floor(Math.random() * adventureSynonyms.length);
	return adventureSynonyms[randomIndex];
};

// Example usage
const randomAdventureSynonym: string = getRandomAdventureSynonym();
console.log(randomAdventureSynonym);
