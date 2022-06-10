import type { RequestHandlerOutput } from '@sveltejs/kit';
import 'dotenv/config';

export async function get(): Promise<RequestHandlerOutput> {
	return {
		status: 200,
		body: {
			apiBaseUrl: process.env.API_BASE_URL
		}
	};
}
