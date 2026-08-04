import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/database.types';

export type DB = SupabaseClient<Database>;

export const THREADS_PER_PAGE = 20;
export const POSTS_PER_PAGE = 30;

/**
 * Run a database query with graceful degradation: if the database is
 * unreachable (e.g. local dev without `supabase start`, or a hosted outage),
 * log loudly and return an empty result instead of crashing the page.
 */
export async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
	try {
		return await fn();
	} catch (err) {
		console.error('[db] query failed, using fallback:', err);
		return fallback;
	}
}

export type CategoryRow = Database['public']['Tables']['categories']['Row'];
export type ThreadRow = Database['public']['Tables']['threads']['Row'];
export type PostRow = Database['public']['Tables']['posts']['Row'];
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];

export type CategoryOverview = Database['public']['Functions']['category_overview']['Returns'][number];

export interface ThreadWithAuthor extends ThreadRow {
	author: Pick<ProfileRow, 'id' | 'display_name' | 'avatar_url'> | null;
	category?: Pick<CategoryRow, 'id' | 'name' | 'slug'> | null;
	post_count: number;
}

export interface PostWithAuthor extends PostRow {
	author: Pick<ProfileRow, 'id' | 'display_name' | 'avatar_url'> | null;
}

export interface ThreadDetail extends ThreadRow {
	author: Pick<ProfileRow, 'id' | 'display_name' | 'avatar_url'> | null;
	category: Pick<CategoryRow, 'id' | 'name' | 'slug'> | null;
	post_count: number;
}

function mapThreadAuthor(rows: any[]): ThreadWithAuthor[] {
	return rows.map((r) => ({
		...r,
		author: r.author ?? r.profiles ?? null,
		category: r.category ?? null
	}));
}

function mapPostAuthor(rows: any[]): PostWithAuthor[] {
	return rows.map((r) => ({
		...r,
		author: r.author ?? r.profiles ?? null
	}));
}

export function getCategories(db: DB): Promise<CategoryRow[]> {
	return safe(
		async () => {
			const { data, error } = await db
				.from('categories')
				.select('*')
				.order('sort_order', { ascending: true })
				.order('id', { ascending: true });
			if (error) throw error;
			return (data ?? []) as CategoryRow[];
		},
		[]
	);
}

export function getForumOverview(db: DB) {
	return safe(
		async () => {
			const { data, error } = await db.rpc('category_overview');
			if (error) throw error;
			return (data ?? []) as CategoryOverview[];
		},
		[] as CategoryOverview[]
	);
}

export function getCategoryBySlug(db: DB, slug: string) {
	return safe(
		async () => {
			const { data, error } = await db
				.from('categories')
				.select('*')
				.eq('slug', slug)
				.maybeSingle();
			if (error) throw error;
			return data as CategoryRow | null;
		},
		null
	);
}

export async function getThreadsByCategory(db: DB, categoryId: number, page: number) {
	const perPage = THREADS_PER_PAGE;
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	const [threads, count] = await Promise.all([
		safe(
			async () => {
				const { data, error } = await db
					.from('threads')
					.select(
						'*, author:profiles!threads_author_id_fkey(id, display_name, avatar_url), replies:posts(count)'
					)
					.eq('category_id', categoryId)
					.order('pinned', { ascending: false })
					.order('updated_at', { ascending: false })
					.range(from, to);
				if (error) throw error;
				const rows = (data ?? []) as any[];
				return rows.map((r) => ({
					...r,
					author: r.author ?? r.profiles ?? null,
					category: r.category ?? null,
					post_count: r.replies?.[0]?.count ?? 0
				})) as ThreadWithAuthor[];
			},
			[] as ThreadWithAuthor[]
		),
		safe(
			async () => {
				const { count, error } = await db
					.from('threads')
					.select('*', { count: 'exact', head: true })
					.eq('category_id', categoryId);
				if (error) throw error;
				return count ?? 0;
			},
			0
		)
	]);

	return { threads, total: count, pages: Math.max(1, Math.ceil(count / perPage)) };
}

export function getThreadDetail(db: DB, threadId: string) {
	return safe(
		async () => {
			const { data, error } = await db
				.from('threads')
				.select(
					'*, author:profiles!threads_author_id_fkey(id, display_name, avatar_url), category:categories(id, name, slug), post_count:posts(count)'
				)
				.eq('id', threadId)
				.maybeSingle();
			if (error) throw error;
			if (!data) return null;
			const row = data as any;
			return {
				...row,
				author: row.author ?? null,
				category: row.category ?? null,
				post_count: (row.post_count as { count: number } | null)?.count ?? 0
			} as ThreadDetail;
		},
		null
	);
}

export async function getPosts(db: DB, threadId: string, page: number) {
	const perPage = POSTS_PER_PAGE;
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	const [posts, count] = await Promise.all([
		safe(
			async () => {
				const { data, error } = await db
					.from('posts')
					.select('*, author:profiles!posts_author_id_fkey(id, display_name, avatar_url)')
					.eq('thread_id', threadId)
					.order('created_at', { ascending: true })
					.range(from, to);
				if (error) throw error;
				return mapPostAuthor((data ?? []) as any[]);
			},
			[] as PostWithAuthor[]
		),
		safe(
			async () => {
				const { count, error } = await db
					.from('posts')
					.select('*', { count: 'exact', head: true })
					.eq('thread_id', threadId);
				if (error) throw error;
				return count ?? 0;
			},
			0
		)
	]);

	return { posts, total: count, pages: Math.max(1, Math.ceil(count / perPage)) };
}

export function getProfile(db: DB, profileId: string) {
	return safe(
		async () => {
			const { data, error } = await db
				.from('profiles')
				.select('*')
				.eq('id', profileId)
				.maybeSingle();
			if (error) throw error;
			return data as ProfileRow | null;
		},
		null
	);
}

export async function getUserActivity(db: DB, profileId: string) {
	const [threads, posts] = await Promise.all([
		safe(
			async () => {
				const { data, error } = await db
					.from('threads')
					.select('*, category:categories(id, name, slug)')
					.eq('author_id', profileId)
					.order('created_at', { ascending: false })
					.limit(10);
				if (error) throw error;
				return (data ?? []) as (ThreadRow & {
					category: Pick<CategoryRow, 'id' | 'name' | 'slug'> | null;
				})[];
			},
			[] as any[]
		),
		safe(
			async () => {
				const { data, error } = await db
					.from('posts')
					.select('*, thread:threads(id, title, category_id)')
					.eq('author_id', profileId)
					.order('created_at', { ascending: false })
					.limit(10);
				if (error) throw error;
				return (data ?? []) as (PostRow & {
					thread: Pick<ThreadRow, 'id' | 'title' | 'category_id'> | null;
				})[];
			},
			[] as any[]
		)
	]);
	return { threads, posts };
}

export async function getUserProfile(db: DB, userId: string) {
	return safe(
		async () => {
			const { data, error } = await db
				.from('profiles')
				.select('*')
				.eq('id', userId)
				.maybeSingle();
			if (error) throw error;
			return data as ProfileRow | null;
		},
		null
	);
}

export function getRecentThreads(db: DB, limit = 5) {
	return safe(
		async () => {
			const { data, error } = await db
				.from('threads')
				.select(
					'*, author:profiles!threads_author_id_fkey(id, display_name, avatar_url), category:categories(id, name, slug)'
				)
				.order('updated_at', { ascending: false })
				.limit(limit);
			if (error) throw error;
			return mapThreadAuthor((data ?? []) as any[]);
		},
		[] as ThreadWithAuthor[]
	);
}
