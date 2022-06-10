import { getContext, setContext } from 'svelte';

export interface SnackbarContext {
	push: (message: string) => void;
}

export const SNACKBAR = 'snackbar';
export const getSnackbar = (): SnackbarContext => {
	return getContext(SNACKBAR);
};

export const setSnackbar = (context: SnackbarContext): void => {
	setContext(SNACKBAR, context);
};
