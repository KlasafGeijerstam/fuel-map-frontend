import i18n from 'sveltekit-i18n';

const config = {
	loaders: [
		{
			locale: 'sv',
			key: '',
			loader: async () => await import('./sv/sv.json')
		}
	]
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations'));
