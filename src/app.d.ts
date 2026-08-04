import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/database.types';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			safeGetSession: () => Promise<{
				user: {
					id: string;
					email?: string | undefined;
				} | null;
			}>;
		}
		interface PageData {
			user?: {
				id: string;
				email?: string | undefined;
			} | null;
			profile?: {
				id: string;
				display_name: string;
				avatar_url: string | null;
				is_admin: boolean;
				created_at: string;
			} | null;
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
