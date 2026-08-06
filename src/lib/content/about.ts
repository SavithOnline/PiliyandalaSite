import type { ContentPage } from './types';

export const about: ContentPage = {
	eyebrow: 'About',
	title: 'Piliyandala at a glance',
	lede:
		'Piliyandala is a major suburban town in the Colombo District of the Western Province, Sri Lanka — roughly 18 km (11 miles) south of Colombo and part of the greater Colombo metropolitan area.',
	sections: [
		{
			heading: 'Piliyandala in numbers',
			lede: 'A visual snapshot of the town and the wider Kesbewa Divisional Secretariat Division.',
			blocks: [
				{
					type: 'metricGrid',
					items: [
						{ label: 'Kesbewa DS population', value: '245,232', detail: '2012 census' },
						{ label: 'Population density', value: '3,832', detail: 'people per km²' },
						{ label: 'Kesbewa DS area', value: '64 km²' },
						{ label: 'From Colombo', value: '~18 km', detail: 'south by road' }
					]
				},
				{
					type: 'barCharts',
					charts: [
						{
							title: 'Annual population growth',
							caption: 'Rates are from different census periods and provide broad context.',
							max: 1.5,
							items: [
								{ label: 'Kesbewa DS · 2001–2012', value: 1.5, display: '1.5%' },
								{ label: 'Sri Lanka · 2012–2024', value: 0.52, display: '0.52%' }
							]
						},
						{
							title: 'Colombo District land value index',
							caption: 'Index growth from the 2017 baseline to mid-2025.',
							max: 256.4,
							items: [
								{ label: '2017 baseline', value: 100, display: '100' },
								{ label: 'Mid-2025', value: 256.4, display: '256.4' }
							]
						}
					]
				}
			]
		},
		{
			heading: 'Quick facts',
			blocks: [
				{
					type: 'table',
					head: ['Attribute', 'Detail'],
					rows: [
						['Full name', 'Piliyandala'],
						['Sinhala name', 'පිළියන්දල'],
						['Tamil name', 'பிலியந்தலை'],
						['Country', 'Sri Lanka'],
						['Province', 'Western Province'],
						['District', 'Colombo District'],
						['Divisional Secretariat', 'Kesbewa Divisional Secretariat Division'],
						['Local authority', 'Kesbewa Urban Council'],
						[
							'Coordinates',
							'6°48′06″N 79°55′22″E (town centre: approx. 6°48′04″N 79°55′22″E)'
						],
						['Elevation', 'Approximately 15 m (49 ft) above sea level'],
						['Distance from Colombo', '~18 km (11 mi) south by road'],
						['Postal code', '10300'],
						['Time zone', 'UTC+5:30 (Sri Lanka Standard Time)'],
						['Climate', 'Tropical monsoon (Köppen Am) / wet zone'],
						['Key road', 'High Level Road (A4)'],
						[
							'Neighbouring suburbs',
							'Moratuwa, Kesbewa, Maharagama, Pannipitiya, Bandaragama, Kahathuduwa, Kottawa'
						],
						['Famous landmark', 'Piliyandala Clock Tower (78 ft / 23.8 m)'],
						['Population (Kesbewa DS Division, 2012 census)', '245,232']
					]
				}
			]
		},
		{
			heading: 'Administration & governance',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>Divisional Secretariat:</strong> Piliyandala town is administered under the Kesbewa Divisional Secretariat Division.',
						'<strong>Local government:</strong> <strong>Kesbewa Urban Council</strong>, headquartered in Piliyandala. The town is part of the Kesbewa Urban Council area. Notably, the <strong>Piliyandala Clock Tower features in the official logo of the Kesbewa Urban Council</strong>.',
						'<strong>Grama Niladhari (GN) divisions:</strong> the town comprises several GN divisions, including Kaliyammahara, among others, which coordinate local services and planning.',
						'<strong>Police &amp; emergency:</strong> Piliyandala has its own police station and fire services (part of the Colombo District police network).',
						'<strong>Postal:</strong> postal code <strong>10300</strong> (Piliyandala Post Office serves the town and surrounding villages).'
					]
				}
			]
		},
		{
			heading: 'Population & demographics',
			blocks: [
				{
					type: 'p',
					text: 'Piliyandala town itself does not have a separate official census enumeration, but it is the core urban settlement of the Kesbewa DS Division.'
				},
				{
					type: 'table',
					head: ['Metric', 'Value (2012 Census)'],
					rows: [
						['Kesbewa DS Division population', '245,232'],
						['Area of Kesbewa DS Division', '64 km²'],
						['Population density', '3,832 persons per km²'],
						[
							'Annual growth rate (2001–2012)',
							'~1.5% (driven by suburban migration from Colombo seeking affordable housing)'
						],
						[
							'National growth rate (2012–2024, preliminary census)',
							'0.52%'
						]
					]
				},
				{
					type: 'ul',
					items: [
						'Some estimates place the wider Piliyandala urban area population around 237,000+, making it among the most populous suburbs in the Western Province.',
						'The 2024 census DS-level data had not yet been released at the time of the latest reporting (late 2025).'
					]
				}
			]
		},
		{
			heading: 'Economy',
			blocks: [
				{
					type: 'p',
					text: 'Piliyandala is a primarily residential suburb with a strong commuter economy — most working residents travel to Colombo for employment in finance, trade and administration (the Colombo Metropolitan Region accounts for ~40% of Sri Lanka\u2019s GDP). Local economic vitality is driven by retail, markets and small businesses. A thriving central market sits in the town centre, directly adjacent to the Clock Tower — considered one of the most vibrant markets in the Western Province.'
				},
				{
					type: 'table',
					head: ['Real estate (Nov 2025)', 'Value'],
					rows: [
						['Average land price', '~Rs. 919,433 per perch, up ~15.75% year-on-year'],
						['Typical 4-bedroom house', '~Rs. 35.7 million (listings Rs. 35–59 million)'],
						[
							'Colombo District Land Valuation Indicator',
							'100 (2017 base) → 256.4 by mid-2025'
						]
					]
				}
			]
		}
	]
};
