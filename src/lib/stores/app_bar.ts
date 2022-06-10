import { writable } from 'svelte/store';

export const backHref = writable<string | null>(null);
