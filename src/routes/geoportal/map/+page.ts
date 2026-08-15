import type { PageLoad } from './$types';

const DEFAULT_LAT = 6.8011;
const DEFAULT_LON = 79.9228;

export const load: PageLoad = ({ url }) => {
	const requestedLat = Number(url.searchParams.get('lat'));
	const requestedLon = Number(url.searchParams.get('lon'));
	const lat = Number.isFinite(requestedLat) ? requestedLat : DEFAULT_LAT;
	const lon = Number.isFinite(requestedLon) ? requestedLon : DEFAULT_LON;
	const name = url.searchParams.get('name')?.trim() || 'Piliyandala town centre';
	const latitudeSpan = 0.008;
	const longitudeSpan = 0.012;

	return {
		name,
		lat,
		lon,
		embedUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${lon - longitudeSpan}%2C${lat - latitudeSpan}%2C${lon + longitudeSpan}%2C${lat + latitudeSpan}&layer=mapnik&marker=${lat}%2C${lon}`
	};
};
