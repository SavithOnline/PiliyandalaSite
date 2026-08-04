import type { ContentPage } from './types';

export const community: ContentPage = {
	eyebrow: 'Community',
	title: 'Notable people, and the first SOS Children’s Village',
	lede:
		'Piliyandala’s community stretches from Test cricket to teledrama, and from a century-old vihara tradition to Sri Lanka’s first SOS Children’s Village.',
	sections: [
		{
			heading: 'SOS Children’s Village Piliyandala',
			id: 'sos',
			blocks: [
				{
					type: 'p',
					text: 'The <strong>first SOS Children’s Village in Sri Lanka</strong>, located at Kesbewa near Piliyandala town (Colombo ~20 km north; Piliyandala town 4 km away).'
				},
				{
					type: 'ul',
					items: [
						'<strong>Foundation stone:</strong> 1 April 1981; first children admitted November 1981; formally dedicated on <strong>20 January 1982</strong> by <strong>Hermann Gmeiner</strong> (founder of SOS Children’s Villages) in the presence of Ministers Ashoka Karunarathne and Dharmasena Attygalle, with the German and Austrian ambassadors attending.',
						'<strong>Scale:</strong> 16 family houses; ~135 children in care (fourth generation); 307+ children integrated into society over 35 years.',
						'<strong>Facilities:</strong> SOS Kindergarten (up to 160 children), <strong>SOS Hermann Gmeiner School</strong> (opened 1985; capacity ~850; model school, grades 1–13), SOS Medical Centre (with dental clinic and antenatal clinic), SOS Social Centre (counselling, day care, daily meals for poor families), youth facilities with workshops (woodwork, metalwork, welding, electronics), and a Mothers’ Retirement Home.',
						'<strong>Hermann Gmeiner Scholarships:</strong> ten two-year full scholarships annually for GCE A/L students from across the country.',
						'<strong>Family Strengthening Programme:</strong> piloted here in 2003; 160 families graduated; 583 children/young adults currently assisted through three community centres.'
					]
				},
				{
					type: 'note',
					text: 'Current beneficiaries: ~740 supported in the community; 110 children learning at SOS schools; 90 children/young people in care; 60 young people supported toward independence.'
				}
			]
		},
		{
			heading: 'Notable people',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>Hashan Thilakaratne</strong> — former Sri Lankan Test cricketer (educated in the Piliyandala area; among the town’s celebrated sports sons).',
						'<strong>Kokila Pawan Jayasuriya</strong> (b. 1 November 1994, Piliyandala) — actor, model and singer in Sinhala cinema, theatre and television; known for <em>Nadagamkarayo</em> and <em>Siri Raja Siri</em>; educated at Piliyandala Central College.',
						'<strong>Kavindu Madushan</strong> (b. 1 August 1997, Piliyandala) — model, dancer, choreographer and teledrama actor; educated at Piliyandala Central College.',
						'<strong>Suranga Nanayakkara</strong> (b. 1981, Piliyandala) — computer scientist.',
						'<strong>Singer Kalhari</strong> — popular vocalist associated with the area.'
					]
				},
				{
					type: 'p',
					text: 'Other locally connected figures include <strong>Somaweera Chandrasiri</strong> (politician; the namesake of Somaweera Chandrasiri Vidyalaya) and the memorial namesakes of local schools: <strong>Sir John Kotelawala</strong> (former Prime Minister of Ceylon), <strong>Philip Artygalle</strong>, <strong>Dharmasena Attygalle</strong> and <strong>Ananda Samarakoon</strong> (composer of the Sri Lankan national anthem, honoured through Wewala Ananda Samarakoon Vidyalaya).'
				},
				{
					type: 'p',
					text: '<strong>D. Simon Samarakoon of Wewala</strong> — benefactor who donated the Clock Tower (1953).'
				}
			]
		},
		{
			heading: 'Sports & recreation',
			blocks: [
				{
					type: 'ul',
					items: [
						'<strong>Piliyandala Central College</strong> is the region’s premier sports institution (first National Sports School), with cricket grounds (hosting Under-19 Division II national school matches since at least 2015), a swimming complex, and teams in rugby, athletics, gymnastics, kabaddi, volleyball, football and netball.',
						'<strong>Sports Yard, Kahathuduwa (2025)</strong> — a new indoor arena for <strong>futsal and cricket</strong> opened near Piliyandala to serve community-level play.',
						'<strong>Bolgoda Lake</strong> offers kayaking, canoeing, jet-skiing, sailing, parasailing, boat safaris, fishing (including the traditional “Ja-Kotuwa” bamboo trap method) and birdwatching.',
						'Football, cricket and volleyball are widely played on school grounds and community fields.'
					]
				}
			]
		}
	]
};
