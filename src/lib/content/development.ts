import type { ContentPage } from './types';

export const development: ContentPage = {
	eyebrow: 'Development',
	title: 'Recent developments & future plans',
	lede:
		'Piliyandala is officially being developed into a major transport hub for southern traffic entering Colombo — a transformation underway since roughly 2017.',
	sections: [
		{
			heading: 'Current & planned works',
			blocks: [
				{
					type: 'ol',
					items: [
						'<strong>Transport hub status:</strong> Piliyandala is officially being developed into a major transport hub for southern traffic entering Colombo (announced via national news; ongoing since ~2017–2020).',
						'<strong>“Sukitha Purawara” programme (UDA, from 2016):</strong> Rs. 660 million allocated — bus stand redevelopment, pedestrian facilities, road improvements; Phase 01 land development worth Rs. 173.4 million completed.',
						'<strong>Maharagama–Piliyandala Road (B367) rehabilitation:</strong> 6.7 km stretch; 5.7 km under repair in phases (US$50 million OPEC-funded); final 1.7 km approved for state funding in November 2025.',
						'<strong>Road Development Authority master plan (2021–2030):</strong> widening of key segments including the B367 bridge at km 6/3.',
						'<strong>Makumbura Multimodal Transport Centre</strong> (nearby Kottawa) complements Piliyandala’s hub function.',
						'<strong>Sports Yard (2025):</strong> new indoor cricket/futsal arena opened at Kahathuduwa.',
						'<strong>Urban design research:</strong> “Towards People-Centered Street Designing — Design Proposal for Piliyandala Town Center” (ResearchGate) proposes pedestrian-friendly town-centre redesign.',
						'<strong>Property boom:</strong> land values rising ~15–16% annually as Colombo’s middle class relocates south.'
					]
				}
			]
		}
	]
};
