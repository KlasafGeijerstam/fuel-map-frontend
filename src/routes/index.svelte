<script lang="ts" context="module">
	import { apiClient } from '$lib/api';
	import { t } from '$lib/translations';
</script>

<h1>{$t('page_title')}</h1>
{#await apiClient.getSites()}
	<p>Loading</p>
{:then sites}
	<p>The sites are:</p>
	<ul>
		{#each sites as site}
			<li>{site.id} {site.address}</li>
		{/each}
	</ul>
{:catch error}
	<p>Error: {error}</p>
{/await}
