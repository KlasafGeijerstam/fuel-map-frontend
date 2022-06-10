<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { loadTranslations } from '$lib/translations';

	export const load: Load = async ({ fetch }) => {
		const configUrl = '/config';
		const [response, _] = await Promise.all([fetch(configUrl), loadTranslations('sv')]);
		const settings = await response.json();
		createApiClient(settings.apiBaseUrl);

		if (response.ok) {
			return {};
		}
		return {
			status: response.status,
			error: new Error('Could not load configuration')
		};
	};
</script>

<script lang="ts">
	import { createApiClient } from '$lib/api';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { t } from '$lib/translations';
	import Content from '$lib/components/content.svelte';
	import Button, { Label, Icon } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Snackbar from '$lib/components/snackbar.svelte';
	import { setBackButtonContext } from '$lib/context/app_bar';
	import { goto } from '$app/navigation';

	let showBackButton = false;
	const backClicked = (): void => {
		history.back();
	};

	setBackButtonContext((show: boolean) => {
		showBackButton = show;
	});
</script>

<TopAppBar variant="static">
	<Row>
		<Section>
			{#if showBackButton}
				<IconButton on:click={backClicked} class="material-icons">arrow_back</IconButton>
			{/if}
			<div class="title">
				<Title on:click={() => goto('/')}>{$t('page_title')}</Title>
			</div>
		</Section>
		<Section align="end">
			<Button>
				<Label>{$t('login')}</Label>
				<Icon class="material-icons">login</Icon>
			</Button>
		</Section>
	</Row>
</TopAppBar>
<Snackbar>
	<Content>
		<slot />
	</Content>
</Snackbar>

<style lang="scss">
	.title {
		cursor: pointer;
	}
</style>
