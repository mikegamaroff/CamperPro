import React, { useState } from 'react';
export default function EventPage() {
	const [result, setResult] = useState(null);

	async function runProgram() {
		const eventData = await getEventData();
		const eventDates = findBestEventDates(eventData.partners);
		const apiResult = await postData(eventDates);
		setResult(apiResult);
	}

	async function getEventData() {
		const response = await fetch(
			'https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=42edcb7f870059025b5e79949468'
		);
		const data = await response.json();
		console.log(data);
		return data;
	}

	async function postData(data) {
		console.log(data);
		const response = await fetch(
			'https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=42edcb7f870059025b5e79949468',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		);
		const result = await response.json();
		return result;
	}
	function findBestEventDates(partners) {
		const countryData = {};

		partners.forEach(partner => {
			const { country, availableDates } = partner;

			if (!countryData[country]) {
				countryData[country] = {
					attendees: [],
					dates: {}
				};
			}

			availableDates.forEach((date, index) => {
				const nextDate = availableDates[index + 1];
				if (nextDate) {
					const dateKey = `${date}:${nextDate}`;
					if (!countryData[country].dates[dateKey]) {
						countryData[country].dates[dateKey] = {
							count: 0,
							partners: []
						};
					}
					countryData[country].dates[dateKey].count += 1;
					countryData[country].dates[dateKey].partners.push(partner.email);
				}
			});
		});

		const countries = Object.keys(countryData).map(country => {
			const dates = Object.entries(countryData[country].dates);
			const bestDates = dates.reduce(
				(best, current) => {
					if (current[1].count > best.count) {
						return { count: current[1].count, dates: current[0], partners: current[1].partners };
					}
					return best;
				},
				{ count: 0, dates: '', partners: [] }
			);

			const [startDate, _] = bestDates.dates.split(':');

			return {
				attendeeCount: bestDates.count,
				attendees: bestDates.partners,
				name: country,
				startDate: bestDates.count > 0 ? startDate : null
			};
		});

		return { countries };
	}

	return (
		<>
			<div className="header">
				<div className="logo">
					<svg
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						viewBox="0 0 338.65961 96"
						enableBackground="new 0 0 338.65961 96"
						xmlSpace="preserve"
					>
						<g>
							<polygon
								fill="#213343"
								points="36.67725,54.33219 11.80918,54.33219 11.80918,80.52859 0,80.52859 0,15.89083 11.80918,15.89083 
		11.80918,42.97103 36.67725,42.97103 36.67725,15.89083 48.48378,15.89083 48.48378,80.52859 36.67725,80.52859 	"
							/>
							<path
								fill="#213343"
								d="M86.26936,59.63634c0,5.38344-4.38531,9.76375-9.76755,9.76375c-5.38368,0-9.76616-4.38031-9.76616-9.76375
		v-27.6849H55.55339v27.6849c0,11.55025,9.39764,20.94558,20.94842,20.94558c11.54842,0,20.94605-9.39533,20.94605-20.94558
		v-27.6849h-11.1785V59.63634z"
							/>
							<path
								fill="#213343"
								d="M169.24556,34.8019c0-5.67621,3.75699-7.47615,7.87025-7.47615c3.31201,0,7.69472,2.52069,10.55424,5.58361
		l7.33325-8.6444c-3.66451-4.9512-11.08791-8.37413-17.17075-8.37413c-12.16731,0-20.93385,7.11424-20.93385,18.91106
		c0,21.88046,26.7482,14.94479,26.7482,27.19404c0,3.77753-3.66638,7.11236-7.86934,7.11236
		c-6.6217,0-8.76961-3.24174-11.80986-6.664l-8.14182,8.46272c5.19122,6.39373,11.63008,9.63736,19.32365,9.63736
		c11.53949,0,20.84325-7.20405,20.84325-18.46149C195.9928,37.77148,169.24556,45.33627,169.24556,34.8019z"
							/>
							<path
								fill="#213343"
								d="M334.72049,70.20278c-6.61697,0-8.49506-2.86096-8.49506-7.24598V43.54658h10.28482v-9.83892h-10.28482
		V20.73515l-11.35779,5.09826v39.53931c0,10.1093,6.97464,15.2092,16.54266,15.2092c1.43121,0,3.40121-0.09248,4.47568-0.35766
		l2.77362-10.19706C337.40775,70.11357,335.97702,70.20278,334.72049,70.20278z"
							/>
							<path
								fill="#213343"
								d="M128.89323,32.27533c-5.54673,0-9.41829,1.61002-13.15736,5.28003V16.27685h-11.21809v39.43546
		c0,14.7604,10.67161,24.86963,22.66236,24.86963c13.32906,0,25.00777-10.28899,25.00777-24.15232
		C152.18791,42.74191,141.41869,32.27533,128.89323,32.27533z M128.8235,69.29173c-7.02754,0-12.72374-5.69642-12.72374-12.72353
		c0-7.02689,5.6962-12.72353,12.72374-12.72353c7.02667,0,12.72331,5.69664,12.72331,12.72353
		C141.54681,63.5953,135.85017,69.29173,128.8235,69.29173z"
							/>
							<path
								fill="#213343"
								d="M250.68346,55.84724c0-13.86333-11.67873-24.15232-25.00778-24.15232
		c-11.99075,0-22.66235,10.10922-22.66235,24.86963V96h11.21809V74.72149c3.73906,3.67001,7.61063,5.28003,13.15735,5.28003
		C239.91422,80.00152,250.68346,69.53494,250.68346,55.84724z M240.04234,55.70865c0,7.02689-5.69664,12.72353-12.72331,12.72353
		c-7.02754,0-12.72374-5.69664-12.72374-12.72353c0-7.0271,5.6962-12.72353,12.72374-12.72353
		C234.3457,42.98513,240.04234,48.68155,240.04234,55.70865z"
							/>
							<path
								fill="#FF5C35"
								d="M286.93246,31.15154V19.88312c2.94116-1.38951,5.00201-4.36508,5.00201-7.8185v-0.26038
		c0-4.76557-3.89944-8.6648-8.66483-8.6648h-0.26016c-4.76578,0-8.66522,3.89923-8.66522,8.6648v0.26038
		c0,3.45341,2.06128,6.42942,5.00241,7.81872v11.26842c-4.37924,0.67656-8.38065,2.48269-11.68219,5.14079l-30.93887-24.06756
		c0.20351-0.78377,0.34645-1.59129,0.34732-2.43868c0.00697-5.39791-4.36313-9.77933-9.76125-9.78631
		c-5.39813-0.00675-9.77956,4.36356-9.78653,9.76147c-0.00653,5.39791,4.36356,9.77933,9.76169,9.78609
		c1.75928,0.00218,3.38739-0.49745,4.81461-1.30911l30.43465,23.67579c-2.58859,3.90685-4.10425,8.5868-4.10425,13.62452
		c0,5.27458,1.66602,10.15281,4.48209,14.16577l-9.25574,9.25574c-0.73169-0.21942-1.49127-0.37304-2.29486-0.37304
		c-4.43547,0-8.0316,3.59592-8.0316,8.0316s3.59613,8.0316,8.0316,8.0316c4.4359,0,8.03159-3.59592,8.03159-8.0316
		c0-0.80316-0.15338-1.56296-0.37302-2.29465l9.15549-9.15528c4.1557,3.17255,9.33069,5.07803,14.96283,5.07803
		c13.64545,0,24.70752-11.06229,24.70752-24.70817C307.84775,43.18587,298.77286,32.98033,286.93246,31.15154z M283.14023,68.20628
		c-6.99615,0-12.6684-5.67137-12.6684-12.66753c0-6.99594,5.67224-12.66753,12.6684-12.66753
		c6.9953,0,12.66754,5.67158,12.66754,12.66753C295.80777,62.53492,290.13553,68.20628,283.14023,68.20628z"
							/>
						</g>
					</svg>
				</div>
				<h1>Event Page</h1>
			</div>

			<div className="card">
				<button className="button" onClick={runProgram}>
					Find Best Event Dates
				</button>

				{result && (
					<div>
						{result.countries &&
							result.countries.map((country, index) => (
								<div key={index}>
									<h3>{country.name}</h3>
									{country.startDate ? (
										<p>
											<strong>Start Date:</strong> {country.startDate}
											<br />
											<strong>Attendee Count:</strong> {country.attendeeCount}
											<br />
											<strong>Attendees:</strong> {country.attendees.join(', ')}
										</p>
									) : (
										<p>No suitable dates found</p>
									)}
								</div>
							))}
					</div>
				)}
			</div>
		</>
	);
}
