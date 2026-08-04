import type { ContentPage } from './types';

export const transport: ContentPage = {
	eyebrow: 'Transport',
	title: 'A transport hub on the southern approach to Colombo',
	lede:
		'The central bus stand near the Clock Tower is the town’s transport hub. Piliyandala has no railway station — but the buses, roads and expressway access more than make up for it.',
	sections: [
		{
			heading: 'Road network',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>High Level Road (A4)</strong> — the national highway that passes through Piliyandala town centre, connecting Colombo (~20 km north) with Ratnapura and the central highlands to the southeast. It is the primary commercial artery of the town.',
						'<strong>Piliyandala Bypass Road (B84 alignment, 2014)</strong> — bypasses the town centre toward Horana, diverting through-traffic and easing congestion.',
						'<strong>Moratuwa–Piliyandala Road (B295)</strong> — 5.065 km, to the southwest (toward Moratuwa).',
						'<strong>Piliyandala–Maharagama Road (B367)</strong> — 7.37 km to the north; rehabilitation of the 6.7 km Maharagama–Piliyandala stretch (partly funded by a US$50 million OPEC loan) was ongoing, with the final 1.7 km funded by government in November 2025.',
						'<strong>Expressway access:</strong> the Kottawa interchange of the Colombo–Galle (Southern) Expressway (E01) is nearby; the Kahathuduwa Interchange lies on the Colombo–Horana (120) Road between Polgasowita and Gonapola. The nearby Makumbura Multimodal Transport Centre serves long-distance traffic.'
					]
				}
			]
		},
		{
			heading: 'Bus services',
			lede:
				'Bus routes are operated by the SLTB and private companies. Fares are indicative: Colombo local trips Rs. 152–244; Galle inter-provincial Rs. 370–410.',
			blocks: [
				{
					type: 'h3',
					text: 'Routes operating through Piliyandala'
				},
				{
					type: 'table',
					head: ['Route', 'Route description'],
					rows: [
						['120', 'Horana / Kesbewa – Colombo'],
						['120/285', 'Bulathsinhala – Colombo'],
						[
							'120/458',
							'Matugama / Neboda – Colombo (via Horana & Anguruwathota)'
						],
						['162', 'Bandaragama – Colombo'],
						['162/3', 'Atalugama – Colombo (via Bandaragama)'],
						['139', 'Kahathuduwa – Kalubowila'],
						['255', 'Mt. Lavinia – Kottawa']
					]
				},
				{
					type: 'h3',
					text: 'Routes terminating at Piliyandala'
				},
				{
					type: 'table',
					head: ['Route', 'Route description'],
					rows: [
						['116', 'Mattakkuliya via Colombo Fort'],
						['120', 'Pettah'],
						['127', 'Moragahahena via Gonapola & Olaboduwa Junction'],
						['139/1', 'Kalubowila'],
						['139/3', 'Korala Ima via Kahathuduwa'],
						['149', 'Bandaragama via Weediyagoda'],
						['149/1', 'Diyakada'],
						['149/2', 'Homagama via Diyagama'],
						['157', 'Kahapola'],
						['157/1', 'Makandana'],
						['157/2', 'Gedabuwana'],
						['158', 'Moratuwa'],
						['159', 'Palagama via Polgasowita'],
						['162/1', 'Bandaragama'],
						['162/2', 'Ambalangoda'],
						[
							'162/3',
							'Jambureliya via Kesbewa, Batuwandara, Wewa Ihala Rd'
						],
						['162/4', 'Karadiyana via Devananda Rd'],
						['295', 'Dampe via Suwarapola'],
						['295/1', 'Hedigama'],
						['296', 'Kottawa via Gorakapitiya'],
						['341', 'Maharagama'],
						[
							'341/2',
							'Maharagama via Karadiyana, Thumbowila, Bokundara & Erawwala'
						],
						['342', 'Kottawa via Polgasowita'],
						['795', 'Gonamadittha'],
						['866', 'Kirigampamunuwa via Polgasowita']
					]
				},
				{
					type: 'h3',
					text: 'Long-distance routes'
				},
				{
					type: 'table',
					head: ['Route', 'Route description'],
					rows: [
						['17/255', 'Panadura – Kandy (via Kottawa, Athurugiriya, Malabe, Kaduwela, Weliweriya, Pasyala)'],
						['255/120 A/C', 'Kadawatha – Moratuwa (via Southern Expressway)'],
						['EX1-26', 'Matara (via Southern Expressway)'],
						[
							'02/425',
							'Dickwella / Matara – Maharagama (via Boralesgamuwa, Kesbewa, Bandaragama, Kalutara)'
						]
					]
				},
				{
					type: 'p',
					text: 'Buses to Galle (~120 km) and Ratnapura are frequent.'
				}
			]
		},
		{
			heading: 'Rail & other',
			blocks: [
				{
					type: 'p',
					text: 'Piliyandala <strong>has no railway station</strong>; the nearest coastal line stations are at <strong>Moratuwa</strong> and <strong>Panadura</strong> (~10–15 minutes away by road). Piliyandala is earmarked to become a <strong>major transport hub</strong> for traffic entering Colombo from the south.'
				}
			]
		}
	]
};
