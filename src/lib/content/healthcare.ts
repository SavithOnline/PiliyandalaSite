import type { ContentPage } from './types';

export const healthcare: ContentPage = {
	eyebrow: 'Healthcare',
	title: 'A divisional hospital with roots in 1939',
	lede:
		'What began as a maternity home in 1939 is now the Divisional Hospital — Piliyandala, a Type-B hospital serving the town under Sri Lanka’s universal healthcare policy, free of charge.',
	sections: [
		{
			heading: 'Divisional Hospital — Piliyandala',
			blocks: [
				{
					type: 'p',
					text: 'A <strong>Type-B Divisional Hospital</strong> under the Ministry of Health, Sri Lanka. Established as a <strong>Maternity Home in 1939</strong>, later upgraded to a divisional hospital. Capacity (2024): <strong>72 beds</strong> across dedicated wards — male medical/surgical, female medical/surgical, maternity and paediatrics.'
				},
				{
					type: 'h3',
					text: 'Services'
				},
				{
					type: 'ul',
					items: [
						'24/7 Outpatient Department (OPD)',
						'Dental clinic',
						'Family health clinic',
						'Medical clinic',
						'Mental health clinic',
						'Antenatal clinic',
						'Baby clinic',
						'Well-women clinic',
						'Family planning clinics',
						'Skin clinic',
						'Direct Observation Treatment (DOT) unit for TB',
						'Laboratory services (full blood counts, glucose, etc.)',
						'Emergency care (Level 4 standards: resuscitation facilities, defibrillators, nebulizers)',
						'On-site pharmacy (free medicines)'
					]
				},
				{
					type: 'note',
					text: 'All services are provided free of charge under Sri Lanka’s universal healthcare policy.'
				}
			]
		},
		{
			heading: 'Primary care & clinics',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>Central Dispensary, Piliyandala</strong> — government dispensary for routine outpatient care.',
						'<strong>Government Ayurvedic Dispensary</strong> — free traditional-medicine consultations.',
						'<strong>MOH Office, Piliyandala</strong> — coordinates maternal and child health, immunisation, family planning, nutrition and dengue prevention programmes. Public Health Midwives (PHMs) manage clinics such as the Maternal and Child Clinic in Bokundara (~3,000 residents per midwife).',
						'Private facilities include <strong>Aichi Lanka Medical Centre</strong> (specialist channelling, ECG, eye examinations), <strong>Kesbewa Medical Centre</strong>, <strong>SethSuwa Arana</strong>, <strong>Unicare Medicals</strong> and others.'
					]
				}
			]
		},
		{
			heading: 'Public health priorities',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>Dengue prevention:</strong> the Piliyandala MOH area has been flagged as high-risk (2023), prompting intensified vector-control campaigns, fogging and community clean-ups.',
						'<strong>Nutrition:</strong> child welfare clinics address malnutrition through growth assessment and complementary-feeding education (supported by published research in the Piliyandala MOH area).',
						'<strong>Community empowerment:</strong> resident-led health promotion in divisions like Kaliyammahara.'
					]
				}
			]
		}
	]
};
