export type ContentBlock =
	| { type: 'p'; text: string }
	| { type: 'h3'; text: string }
	| { type: 'ul'; items: string[] }
	| { type: 'ol'; items: string[] }
	| { type: 'quote'; text: string; cite?: string }
	| { type: 'note'; text: string }
	| { type: 'table'; head?: string[]; rows: string[][]; caption?: string }
	| {
			type: 'metricGrid';
			items: { label: string; value: string; detail?: string }[];
	  }
	| {
			type: 'barCharts';
			charts: {
				title: string;
				caption: string;
				max: number;
				items: { label: string; value: number; display: string }[];
			}[];
	  }
	| { type: 'timeline'; items: { year: string; title?: string; text: string }[] };

export interface ContentSection {
	heading: string;
	lede?: string;
	id?: string;
	blocks: ContentBlock[];
}

export interface ContentPage {
	eyebrow: string;
	title: string;
	lede: string;
	image?: {
		src: string;
		alt: string;
		caption: string;
		credit: string;
	};
	sections: ContentSection[];
}
