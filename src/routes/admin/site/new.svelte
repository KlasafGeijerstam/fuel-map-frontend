<script lang="ts">
	import { getSnackbar } from '$lib/context/snackbar';
	import { apiClient, type Site, type SiteId } from '$lib/api';
	import EditSite from '$lib/components/edit_site.svelte';
	import { showBackButton } from '$lib/context/app_bar';
	import { t } from '$lib/translations';
	import { goto } from '$app/navigation';
	const snackbar = getSnackbar();

	showBackButton(true);

	let site: Site = {
		id: '0' as SiteId,
		address: '',
		lat: '',
		lng: ''
	};

	const saveSite = async () => {
		try {
			const createdSite = await apiClient.createSite(site);
			goto(`/admin/site/${createdSite.id}`, { replaceState: true });
		} catch (e) {
			snackbar.push($t('common.failed'));
		}
	};
</script>

<EditSite bind:site on:save={saveSite} create />
