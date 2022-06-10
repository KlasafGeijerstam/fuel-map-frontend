<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { apiClient, type Site, type SiteId } from '$lib/api';

	type Params = { id: SiteId };
	type InputProps = Record<string, never>;
	type OutputProps = { siteId: SiteId };

	export const load: Load<Params, InputProps, OutputProps> = async ({ params }) => {
		return {
			props: {
				siteId: params.id
			}
		};
	};
</script>

<script lang="ts">
	import Loader from '$lib/components/loader.svelte';
	import { getSnackbar } from '$lib/context/snackbar';
	import EditSite from '$lib/components/edit_site.svelte';
	import { showBackButton } from '$lib/context/app_bar';
	import { t } from '$lib/translations';
	const snackbar = getSnackbar();
	showBackButton(true);

	export let siteId: SiteId;
	let site: Site;

	const loadSite = async () => {
		try {
			site = await apiClient.getSite(siteId);
		} catch (e) {
			console.error(e);
		}
	};

	const loading = loadSite();

	const deleteSite = async () => {
		await apiClient.deleteSite(siteId);
		history.back();
	};

	const saveSite = async () => {
		await apiClient.updateSite(siteId, site);
		snackbar.push($t('common.success'));
	};
</script>

{#await loading}
	<Loader />
{:then _}
	<EditSite bind:site on:save={saveSite} on:delete={deleteSite} />
{/await}
