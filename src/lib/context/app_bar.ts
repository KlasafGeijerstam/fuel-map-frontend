import { getContext, onDestroy, setContext } from 'svelte';

const BACK_CONTEXT = 'app_bar_back';
export type BackFunction = (show: boolean) => void;

export const showBackButton = (show: boolean): void => {
	const context = getContext(BACK_CONTEXT) as BackFunction;
	context(show);
};

export const setBackButtonContext = (func: BackFunction): void => {
	setContext(BACK_CONTEXT, (show: boolean) => {
		onDestroy(() => {
			func(false);
		});

		func(show);
	});
};
