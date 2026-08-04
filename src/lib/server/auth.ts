import { base } from '$app/paths';

const FALLBACK_PATH = `${base}/forum`;

/**
 * Return a same-origin path inside this application, or the forum fallback.
 * Parsing against a fixed origin also rejects protocol-relative and backslash
 * variants that a simple startsWith('/') check can miss.
 */
export function safeNextPath(value: string | null | undefined): string {
	if (!value) return FALLBACK_PATH;

	try {
		const origin = 'https://piliyandala.invalid';
		const parsed = new URL(value, origin);
		const isInsideApp = parsed.pathname === base || parsed.pathname.startsWith(`${base}/`);

		if (parsed.origin !== origin || !isInsideApp) return FALLBACK_PATH;

		return `${parsed.pathname}${parsed.search}${parsed.hash}`;
	} catch {
		return FALLBACK_PATH;
	}
}
