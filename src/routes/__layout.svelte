<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { loadTranslations } from '$lib/translations';

	export const load: Load = async ({ fetch }) => {
		const configUrl = '/config';
		const response = await fetch(configUrl);

		await loadTranslations('sv');

		if (response.ok) {
			return {
				props: {
					settings: await response.json()
				}
			};
		}
		return {
			status: response.status,
			error: new Error('Could not load configuration')
		};
	};
</script>

<script lang="ts">
	import { createApiClient, type AppConfig } from '$lib/api';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { t } from '$lib/translations';
	import Content from '$lib/components/content.svelte';
	import Button, { Label, Icon } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Snackbar from '$lib/components/snackbar.svelte';
	import { setBackButtonContext } from '$lib/context/app_bar';
	import { goto } from '$app/navigation';
	export let settings: AppConfig;

	let showBackButton = false;
	const backClicked = (): void => {
		history.back();
	};

	setBackButtonContext((show: boolean) => {
		showBackButton = show;
	});
	createApiClient(settings.apiBaseUrl);
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
