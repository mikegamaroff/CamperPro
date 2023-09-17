/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { v4: uuidv4 } = require('uuid');
const { createDbInstance } = require('./util/camperprodbjs');

const db = createDbInstance();
const titles = [
	'Whispering Pines Campground',
	'Riverside Retreat',
	'Sunset Valley Campsite',
	'Wilderness Haven',
	'Mountain Vista Campground',
	'Serenity Springs',
	'Lakeview Oasis',
	'Tranquil Trails Campsite',
	'Hidden Meadows Retreat',
	"Nature's Bliss Campground"
];

const streetNames = ['Maple', 'Main', 'Oak', 'Cedar', 'Pine', 'Elm', 'Birch', 'Willow', 'Spruce', 'Juniper'];
const cityNames = [
	'Springfield',
	'Bristol',
	'Oakland',
	'Cedarville',
	'Fairview',
	'Newport',
	'Lexington',
	'Riverside',
	'Greenville',
	'Windsor'
];
const states = ['CA', 'TX', 'NY', 'FL', 'IL', 'PA', 'OH', 'GA', 'MN', 'NC'];
const features = ['river', 'mountain', 'lake', 'sea', 'wildlife', 'hiking', 'forest'];
const EmptyNewCampsite = {
	type: 'campsite',
	description: 'A nice description of a campsite',
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	private: false,
	active: true,
	reviewsCount: 0,
	tripsCount: 0,
	draftStage: 1
};

// Function to generate a random US ZIP code
function generateRandomZipCode() {
	// Range of valid ZIP codes in the US
	const minZipCode = 501;
	const maxZipCode = 99950;

	// Generate a random ZIP code within the range
	const randomZipCode = Math.floor(Math.random() * (maxZipCode - minZipCode + 1)) + minZipCode;

	// Pad the ZIP code with leading zeros if necessary
	const paddedZipCode = randomZipCode.toString().padStart(5, '0');

	return paddedZipCode;
}

// Function to generate random addresses
function generateRandomAddress() {
	const address = {
		address1:
			streetNames[Math.floor(Math.random() * streetNames.length)] + ' Street ' + Math.floor(Math.random() * 100),
		address2: 'Apt ' + Math.floor(Math.random() * 20),
		city: cityNames[Math.floor(Math.random() * cityNames.length)],
		postalCode: generateRandomZipCode()
	};
	return address;
}

// Function to generate random coordinates
function generateRandomCoordinates() {
	const coordinates = {
		lat: Math.random() * 90,
		lng: Math.random() * 180
	};
	return coordinates;
}

// Generate an array of 10 objects with random address and coordinates
const campsiteLocationArray = [];

for (let i = 0; i < 10; i++) {
	const campsiteLocation = {
		state: states[Math.floor(Math.random() * states.length)],
		country: 'USA',
		nearestTown: cityNames[Math.floor(Math.random() * cityNames.length)],
		receptionAddress: generateRandomAddress(),
		coordinates: generateRandomCoordinates(),
		directions:
			'Go down interstate 13 until you come to the big water tower, turn left and drive down the dust road for about 2 miles and you will see a gate with a Toby Ranch sign where you enter.'
	};
	campsiteLocationArray.push(campsiteLocation);
}
let j = 0;
// Generate 10 test users
for (let i = 0; i < 10; i++) {
	const title = titles[Math.floor(Math.random() * titles.length)];
	const location = campsiteLocationArray[Math.floor(Math.random() * titles.length)];
	const newCampsite = EmptyNewCampsite;
	newCampsite._id = `campsite:${uuidv4()}`;
	newCampsite.title = title;
	newCampsite.author = 'user:47b1517b-f357-427d-b7cb-f140925cbc9c';
	newCampsite.rating = Number((Math.random() * 5 + 1).toFixed(2));
	newCampsite.location = location;
	newCampsite.draft = false;
	newCampsite.pricePerNight = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
	newCampsite.receptionCheckin = Math.random() < 0.5;
	newCampsite.attributes = { feature: [features[Math.floor(Math.random() * features.length)]] };
	newCampsite.images = [
		{
			id: j++,
			contentType: 'image/jpeg'
		}
	];
	newCampsite.capacity = {
		numberOfTentSites: Number((Math.random() * 10 + 1).toFixed(0)),
		acreage: Number((Math.random() * 20 + 1).toFixed(0))
	};
	// Save the user to the database
	db.insert(newCampsite).then(response => console.log(`Created campsite: ${response.id}`));
}
