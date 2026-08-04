import type { ContentPage } from './types';

export const history: ContentPage = {
	eyebrow: 'History',
	title: 'From a royal resting place to Colombo’s southern gateway',
	lede:
		'The name Piliyandala comes from the Sinhala words Pili (clothes), Andi (wear) and Dola (stream/place) — literally “the place or stream where clothes were worn (changed).”',
	sections: [
		{
			heading: 'Etymology — the Prince Sapumal legend',
			blocks: [
				{
					type: 'p',
					text: 'According to local folklore, the name traces back to a legendary event in the <strong>15th century</strong> during the <strong>Kingdom of Kotte</strong> (1412–1467, reign of King Parakramabahu VI). After Prince <strong>Sapumal</strong> (also known as Sapumal Kumara, an adopted son of King Parakramabahu VI) successfully conquered <strong>Yapa Patuna</strong> (the present-day Jaffna Kingdom), he was on his way to the Kotte court for an audience with the king. On the journey, he is said to have <strong>bathed and changed his battle attire</strong> at a local creek.'
				},
				{
					type: 'ul',
					items: [
						'The creek became known as <strong>“Pili Andi Dola”</strong> (පිළි+ඇඳි+දොල) — the stream where clothes were worn.',
						'Over time, the name evolved into <strong>Piliyandala</strong>.',
						'The stream still flows through the area today, although it has shrunk to a small creek.'
					]
				},
				{ type: 'note', text: 'Alternative names in some references include “Piliyandara.”' }
			]
		},
		{
			heading: 'A historical timeline',
			lede: 'From a medieval transit point to a modern transport hub.',
			blocks: [
				{
					type: 'timeline',
					items: [
						{
							year: '15th c.',
							title: 'A transit point of the Kingdom of Kotte',
							text: 'In the 15th century, Piliyandala served as a key transit point within the Kingdom of Kotte, facilitating movement along routes south of Colombo for military expeditions and administrative travel. Its strategic position near the capital tied it to the pre-colonial trade and military pathway network connecting the southwestern coast with inland territories. The Sapumal legend places Piliyandala firmly within Kotte-era heritage, although no major archaeological sites have been identified within the town itself.'
						},
						{
							year: '16th–20th c.',
							title: 'Colonial era — a rural outpost',
							text: 'During Portuguese, Dutch and British colonial rule, Piliyandala remained a predominantly rural outpost about 18 km south of Colombo. Development was confined to basic agriculture and its historical role as a transit point on the route to the south (the present High Level Road corridor). Infrastructure investment was minimal, reflecting the general neglect of peripheral areas outside major urban centres.'
						},
						{
							year: '1939',
							title: 'First healthcare institution',
							text: 'A maternity home was established in Piliyandala, laying the groundwork for the town’s healthcare system (the institution later became the Divisional Hospital).'
						},
						{
							year: '1948',
							title: 'Post-independence urbanisation',
							text: 'Sri Lankan independence in 1948 triggered rapid urbanisation, as rural migrants moved toward the capital region for employment. Piliyandala transformed from a quiet outpost into a bustling residential and commercial node.'
						},
						{
							year: '1952–53',
							title: 'The Clock Tower',
							text: 'On 11 September 1952 the foundation stone of the Piliyandala Clock Tower was laid by C.W.W. Kannangara (then Minister of Local Government). The tower was commissioned on 30 April 1953 after only seven months of construction — and has been running ever since.'
						},
						{
							year: 'Late 20th c.',
							title: 'A residential suburb and interchange',
							text: 'The town grew into a key residential suburb and, later, a major transport interchange for the Colombo metropolitan area.'
						},
						{
							year: '2014',
							title: 'Piliyandala Bypass Road',
							text: 'The bypass (B84 alignment toward Horana) was constructed to divert through-traffic from the town centre.'
						},
						{
							year: '2016',
							title: '“Sukitha Purawara” second city',
							text: 'Piliyandala was selected as the second city under the Urban Development Authority’s “Sukitha Purawara” programme, with Rs. 660 million allocated for infrastructure improvements including bus stand redevelopment, road upgrades and pedestrian facilities (Phase 01 land development alone: Rs. 173.4 million).'
						},
						{
							year: '2020',
							title: 'Town development fast-tracked',
							text: 'Ministry of Transport discussions to fast-track the Piliyandala town development plan.'
						},
						{
							year: '2025',
							title: 'Maharagama–Piliyandala road completion',
							text: 'Cabinet approved state funds to complete the final 1.7 km of the Maharagama–Piliyandala road rehabilitation (B367); the 6.7 km stretch is being repaired partly with a US$50 million OPEC loan.'
						}
					]
				}
			]
		}
	]
};
