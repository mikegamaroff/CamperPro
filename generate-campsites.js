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
const authors = [
	'John Smith',
	'Alan West',
	'Gabriel Gamaropff',
	'Mike Gamaroff',
	'Shiela Lange',
	'Robbie Starbuck',
	'Steve Bannon',
	'Donald Trump',
	'Vladimir Putin',
	'Nigel Farage'
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
const EmptyNewCampsite = {
	type: 'campsite',
	category: 'public',
	images: [],
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
	campsiteType: 'private',
	attributes: [
		{
			type: 'feature',
			name: 'default'
		}
	],
	active: true
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
		state: states[Math.floor(Math.random() * states.length)],
		postalCode: generateRandomZipCode(),
		country: 'USA'
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
const campsiteArray = [];

for (let i = 0; i < 10; i++) {
	const campsite = {
		receptionAddress: generateRandomAddress(),
		coordinates: generateRandomCoordinates()
	};
	campsiteArray.push(campsite);
}
// Generate 10 test users
for (let i = 0; i < 10; i++) {
	const title = titles[Math.floor(Math.random() * titles.length)];
	const author = authors[Math.floor(Math.random() * titles.length)];
	const location = campsiteArray[Math.floor(Math.random() * titles.length)];

	const newCampsite = EmptyNewCampsite;
	newCampsite._id = `campsite:${uuidv4()}`;
	newCampsite.title = title;
	newCampsite.author = author;
	newCampsite.rating = (Math.random() * 4 + 1).toFixed(2);
	newCampsite.location = location;
	newCampsite.draft = false;
	newCampsite.pricePerNight = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
	newCampsite.receptionCheckin = Math.random() < 0.5;
	newCampsite.capacity = {
		numberOfTentSites: (Math.random() * 10 + 1).toFixed(0),
		acreage: (Math.random() * 20 + 1).toFixed(0)
	};
	// Save the user to the database
	db.insert(newCampsite).then(response => console.log(`Created campsite: ${response.id}`));
}
