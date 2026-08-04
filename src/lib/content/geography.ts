import type { ContentPage } from './types';

export const geography: ContentPage = {
	eyebrow: 'Geography',
	title: 'The southern belt of the Colombo District',
	lede:
		'Piliyandala sits at the intersection of the High Level Road (A4) and several B-class roads, centred on the Clock Tower roundabout — about 20 km by road from central Colombo.',
	sections: [
		{
			heading: 'Location & boundaries',
			blocks: [
				{
					type: 'p',
					text: 'Piliyandala lies in the <strong>southern belt of the Colombo District</strong>. The town centre is located at the intersection of the High Level Road (A4) and several B-class roads, centred around the Clock Tower roundabout.'
				},
				{
					type: 'ul',
					items: [
						'<strong>Boundaries:</strong> Makandana to the east, Bataketara (Batakettara) to the south.',
						'Further connections to localities such as <strong>Deltara, Hedigama, Mampe, Wewala, Bokundara, Suwarapola</strong> and <strong>Kolamunna</strong>.',
						'<strong>Bolgoda Lake</strong>, the largest natural freshwater lake in Sri Lanka, lies approximately 5–7 km to the southwest and influences local ecology and recreation.'
					]
				}
			]
		},
		{
			heading: 'Climate',
			blocks: [
				{
					type: 'p',
					text: '<strong>Köppen classification:</strong> Tropical monsoon climate (Am) — classified under Sri Lanka’s wet zone.'
				},
				{
					type: 'ul',
					items: [
						'<strong>Temperature:</strong> stable year-round, typically 26°C–31°C daily; annual highs average 28.6°C–31.4°C and lows 23.3°C–26.4°C. Proximity to the Indian Ocean moderates extremes; urban heat from Colombo slightly elevates local temperatures.',
						'<strong>Rainfall:</strong> annual average <strong>2,039 mm</strong> across approximately 272 rainy days. The heaviest rain falls during the <strong>southwest monsoon (May–September)</strong>, peaking at about 329 mm in June. Inter-monsoon periods (March–April and October–November) bring shorter, intense rains.',
						'<strong>Humidity:</strong> ranges from 74% (January) to 83% (June–July).',
						'Localised flooding can occur during heavy monsoon periods, occasionally affecting commuting.'
					]
				}
			]
		},
		{
			heading: 'Hydrology',
			blocks: [
				{
					type: 'p',
					text: 'The historic <strong>Pili Andi Dola</strong> stream — the creek of the town’s founding legend — still runs through Piliyandala (much reduced). The town drains toward the <strong>Bolgoda Lake</strong> basin — one of the most biodiverse wetlands in the country.'
				}
			]
		}
	]
};
