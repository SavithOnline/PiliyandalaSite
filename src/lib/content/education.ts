import type { ContentPage } from './types';

export const education: ContentPage = {
	eyebrow: 'Education',
	title: 'Piliyandala Central College — “The Pride of Piliyandala”',
	lede:
		'Sinhala: පිලියන්දල මධ්ය මහා විද්යාලය — a National School (Type 1AB), the first National Sports School in Sri Lanka, and among the first Central Colleges founded under C.W.W. Kannangara.',
	sections: [
		{
			heading: 'Piliyandala Central College (PCC)',
			blocks: [
				{
					type: 'table',
					head: ['Attribute', 'Detail'],
					rows: [
						['Established', '1887 (as Mampe Piyarathanasara Buddhist Mix School); became Central College on 4 January 1944'],
						['Founder', 'Mampe Saranapala Thero (Buddhist monk)'],
						[
							'Status',
							'First National Sports School in Sri Lanka; among the first Central Colleges founded under C.W.W. Kannangara'
						],
						['Enrolment', '~4,000–5,000 students'],
						['Grades', '6–13 (mixed gender; ages 11–19)'],
						['Mediums', 'Sinhala (primary); English medium option introduced 2009'],
						[
							'Motto',
							'Bodetha pabodetha dametha — “Awareness, Enlightenment, Discipline” (බොධෙථ පබොධෙථ දමෙථ)'
						],
						['Colours', 'Dark blue, gold and maroon'],
						['School song', '“සිරිබර මැදි විදුහල් මාතා” (Beautiful Mother Central College)'],
						['Campus', '~48,000 m² (520,000 sq ft), spreading from Piliyandala toward Suwariyapola'],
						['Alumni body', 'Old Centralions; students known as “Centralions”']
					]
				},
				{
					type: 'h3',
					text: 'History in brief'
				},
				{
					type: 'ul',
					items: [
						'Founded in <strong>1887</strong> by Ven. Mampe Saranapala Thero as the <strong>Mampe Piyarathanasara Buddhist Mix School</strong> — one of the first Buddhist schools in Sri Lanka, part of the Buddhist revival movement.',
						'Handed over to the <strong>Buddhist Theosophical Society</strong>, then transferred to the government as the school outgrew its management.',
						'<strong>1920</strong> — A government-run Public English Medium Mix School opened adjacent to the Sinhala-medium school (first headmaster: S.W. Sahabandu).',
						'<strong>4 January 1944</strong> — <strong>C.W.W. Kannangara</strong> combined both schools to form <strong>Piliyandala Central College</strong>; it became a Madhya Vidyalaya (Central College) on 4 March 1944. It was the <strong>first government-run mixed-gender secondary school</strong> in the country.',
						'<strong>2009</strong> — Designated the <strong>first National Sports School</strong> in Sri Lanka; the playground and pavilion were officially opened by then-President <strong>Mahinda Rajapaksa</strong>.',
						'<strong>2011</strong> — A <strong>50-metre, 8-lane swimming pool complex with diving facilities</strong> was constructed under the Ministry of Sports (revised contract cost Rs. 43,882,660).',
						'<strong>2025</strong> — Inaugural <strong>Student Parliament</strong> session held at the Old Parliament Chamber, Colombo; received the Presidential Appreciation Award for academic brilliance.'
					]
				},
				{
					type: 'h3',
					text: 'Sports'
				},
				{
					type: 'p',
					text: 'Rugby, Carrom, Cricket, Football, Girls’ Football, Chess, Wushu, Badminton, Karate, Swimming, Athletics, Basketball, Volleyball and Netball. Notable achievements include:'
				},
				{
					type: 'ul',
					items: [
						'Annual <strong>“Battle of the Salpiti-Raigam”</strong> two-day cricket fixture vs Taxila Central College, Horana (20th edition played June 2022; PCC won by 53 runs).',
						'2022: Historic school-cricket win over Taxila Central Horana.',
						'2016: Top positions in the All Island School Games (gymnastics).',
						'2025: Under-17 Kabaddi Western Province champions; All Island School Dance Competition (Baratha) runner-up; Zonal Innovation & Invention Competition 1st/2nd places.'
					]
				}
			]
		},
		{
			heading: 'Other government schools in the area',
			blocks: [
				{
					type: 'h3',
					text: 'Primary schools'
				},
				{
					type: 'ul',
					items: [
						'Piliyandala No: 1 Kanishta Vidyalaya',
						'Somaweera Chandrasiri Vidyalaya',
						'Mampe Junior School',
						'Deltara Kanishta Vidyalaya',
						'Makuluduwa Kanishta Vidyalaya',
						'Hedigama Sri Sudarshana Kanishta Vidyalaya'
					]
				},
				{
					type: 'h3',
					text: 'Secondary schools'
				},
				{
					type: 'ul',
					items: [
						'Mampe Dharmaraja Maha Vidyalaya',
						'Sir John Kotelawala Maha Vidyalaya',
						'Madapaatha Philip Artygalle Maha Vidyalaya',
						'Kesbewa Dharmasena Attygalle Balika Vidyalaya (girls’)',
						'Wewala Ananda Samarakoon Vidyalaya'
					]
				},
				{
					type: 'h3',
					text: 'International / private schools'
				},
				{
					type: 'ul',
					items: [
						'Negombo South International School (Piliyandala branch)',
						'Guidance International School',
						'<strong>Leeds International School</strong> (well-known international curriculum provider)',
						'Linfield International School'
					]
				},
				{
					type: 'h3',
					text: 'Higher education nearby'
				},
				{
					type: 'ul',
					items: [
						'<strong>University of Moratuwa</strong> — approximately 3.5 km away.',
						'<strong>Hermann Gmeiner School</strong> (SOS Children’s Village) — model school serving grades 1–13, capacity ~850 students.'
					]
				}
			]
		}
	]
};
