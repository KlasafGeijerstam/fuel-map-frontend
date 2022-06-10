<script lang="ts">
	import type { Site } from '$lib/api';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import { t } from '$lib/translations';
	import Button, { Label, Icon } from '@smui/button';
	import Dialog, { Title, Actions } from '@smui/dialog';
	import { createEventDispatcher } from 'svelte';

	export let site: Site;
	export let create = false;
	let showConfirmDelete = false;

	const dispatch = createEventDispatcher();

	const deleteSite = async () => {
		dispatch('delete');
	};

	const saveSite = async () => {
		dispatch('save');
	};
</script>

<LayoutGrid>
	<Cell spanDevices={{ desktop: 3, tablet: 1, phone: 0 }} />
	<Cell spanDevices={{ desktop: 6, tablet: 10, phone: 12 }}>
		<div class="form">
			<Textfield bind:value={site.address} label={$t('site_page.address')} />
			<Textfield bind:value={site.lat} label={$t('site_page.latitude')} />
			<Textfield bind:value={site.lng} label={$t('site_page.longitude')} />
			<div class="buttons">
				{#if !create}
					<Button
						on:click={() => (showConfirmDelete = true)}
						variant="raised"
						class="delete-button"
					>
						<Label>{$t('common.delete')}</Label>
						<Icon class="material-icons">delete</Icon>
					</Button>
				{/if}
				<Button on:click={saveSite} variant="raised" color="primary">
					<Label>{$t('common.save')}</Label>
					<Icon class="material-icons">save</Icon>
				</Button>
			</div>
		</div>
	</Cell>
	<Cell spanDevices={{ desktop: 3, tablet: 1, phone: 0 }} />
</LayoutGrid>

<Dialog bind:open={showConfirmDelete}>
	<Title>{$t('common.are_you_sure')}</Title>
	<Actions>
		<Button>
			<Label>{$t('common.cancel')}</Label>
		</Button>
		<Button on:click={deleteSite}>
			<Label>{$t('common.yes')}</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	@use '../../lib/theme/app';

	.form {
		display: flex;
		flex-direction: column;
	}

	.buttons {
		margin: auto;
		margin-top: 2em;
	}

	* :global(.delete-button) {
		background-color: app.$error;
	}
</style>
