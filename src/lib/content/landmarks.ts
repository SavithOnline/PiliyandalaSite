import type { ContentPage } from './types';

export const landmarks: ContentPage = {
	eyebrow: 'Landmarks & culture',
	title: 'The Clock Tower, the Vesak thorana and Bolgoda Lake',
	lede:
		'Piliyandala’s identity is anchored by one structure — a 78-foot clock tower at the town’s heart — and coloured by its festivals, lake and cricket.',
	sections: [
		{
			heading: 'The Piliyandala Clock Tower',
			lede:
				'Sinhala: පිළියන්දල ඔරලෝසු කණුව — location: centre of Piliyandala town, on the Clock Tower roundabout.',
			blocks: [
				{
					type: 'table',
					head: ['Attribute', 'Detail'],
					rows: [
						['Type', 'Clock tower (three-tiered)'],
						[
							'Height',
							'78 feet (23.8 m) — among the tallest clock towers in Sri Lanka (often cited as second tallest on the island)'
						],
						['Girth', '16 feet (4.9 m)'],
						['Construction started', '11 September 1952'],
						['Completed / commissioned', '30 April 1953 (built in ~7 months)'],
						['Builder / donor', 'D. Simon Samarakoon of Wewala'],
						[
							'Memorial',
							'To his parents, Don Cornelis Wijewickrema Samarakoon and his wife'
						],
						[
							'Foundation stone laid by',
							'C.W.W. Kannangara, then Minister of Local Government'
						],
						['Material', 'Brick and cement, with a concrete layer on the topmost floor'],
						[
							'Status',
							'Functional since 1953; considered of archaeological value (70+ years old)'
						],
						['Coordinates', '6°48′04″N 79°55′22″E']
					]
				},
				{
					type: 'h3',
					text: 'History'
				},
				{
					type: 'p',
					text: 'Erected by <strong>D. Simon Samarakoon</strong>, a resident of Wewala, <strong>in memory of his parents</strong> — Don Cornelis Wijewickrema Samarakoon and his wife. The foundation stone was laid by <strong>C.W.W. Kannangara</strong> — the “Father of Free Education” in Sri Lanka and then Minister of Local Government — on <strong>11 September 1952</strong>. Construction was completed in seven months, and the tower was commissioned on <strong>30 April 1953</strong>. Its clock has been running continuously ever since.'
				},
				{
					type: 'quote',
					text: '“Erected by his son Simon Samarakoon, in memory of Don Cornelis Wijewickrema Samarakoon of Wewala who passed away, and his wife. 30 April 1953 AD.”',
					cite: 'The Sinhala inscription on the tower (translated)'
				},
				{
					type: 'h3',
					text: 'Architecture & mechanics'
				},
				{
					type: 'ul',
					items: [
						'Three-tiered structure built with brick and cement, topped with a concrete floor.',
						'The top floor is accessible via an internal iron staircase.',
						'At the top of the staircase sits a box (1.52 m × 1.2 m) housing the clock’s three operating machines — winding mechanisms powered simultaneously by a single key once a week.',
						'Each of the four clock faces is over 1.52 m (5 ft) wide; the minute hand is 2.5 ft long and the hour hand 2 ft long.',
						'A 1 ft broad round “butte” (bell weight) hangs from a five-foot supporting bar.',
						'Equipped with three large chimes, each 0.92 m (3 ft) tall and 0.61 m (2 ft) broad, announcing the hour.'
					]
				},
				{
					type: 'h3',
					text: 'Significance'
				},
				{
					type: 'ul',
					items: [
						'A major navigational landmark and traffic roundabout at the heart of the town.',
						'<strong>Symbol of local heritage:</strong> featured in the official logo of the Kesbewa Urban Council.',
						'Represents early community-driven architecture of post-colonial Sri Lanka and the optimism of the 1950s under leaders like Kannangara.',
						'Featured in media tributes (e.g. “Homage to 50 years old clock tower,” Daily News, 2003) and Sri Lanka Telecom’s “Pura Varuna” documentary series.'
					]
				}
			]
		},
		{
			heading: 'Piliyandala Vesak Thorana',
			blocks: [
				{
					type: 'p',
					text: 'A famous <strong>electrically lit Vesak pandol (Thorana)</strong> is erected in front of Piliyandala Central College every Vesak festival. Each scene of a chosen <strong>Jataka tale</strong> is illuminated with coloured lights in electronically designed patterns, accompanied by traditional “viridu” verse singing or narration. It is organised by the <strong>Piliyandala Vaishakya Pujothsava Kamituwa</strong> (Vesak festival committee) and supported by local benefactors and religious organisations.'
				},
				{
					type: 'note',
					text: 'The pandol was not erected between 2019 and 2021 due to the COVID-19 pandemic and the 2019 Easter attacks; it returned in the Poson season of 2022.'
				}
			]
		},
		{
			heading: 'Religion & places of worship',
			blocks: [
				{
					type: 'h3',
					text: 'Buddhist temples'
				},
				{
					type: 'ul',
					items: [
						'<strong>Sri Sumanarama Purana Viharaya</strong> (Bataketara) — an ancient temple established over a century ago; a centre for worship and community gatherings.',
						'<strong>Sri Bimbaramaya Viharaya</strong> (Kolamunna) — active community temple with a <strong>Daham Pasala</strong> (Sunday Buddhist school).',
						'<strong>Vidya Shanthi Piriven Maha Viharaya (“Shanthi Viharaya”)</strong> — modern temple noted for its architecture and monastic education, including the unique <strong>Punchi Kirivehera</strong> stupa.',
						'<strong>Sri Sudarshanaramaya</strong> (Hedigama).',
						'<strong>Sri Jayabodhi Viharaya</strong> (Piliyandala).'
					]
				},
				{
					type: 'h3',
					text: 'Christian churches'
				},
				{
					type: 'ul',
					items: [
						'<strong>St. Luke’s Church, Piliyandala</strong> — the town’s principal Anglican church, located in the town centre.'
					]
				}
			]
		}
	]
};
