import type { HandleError } from '@sveltejs/kit';

export const handleError: HandleError = async ({ error, event }) => {
	console.error('error!', error, event);
};
