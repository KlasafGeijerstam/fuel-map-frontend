<script lang="ts" context="module">
	import { apiClient, type Site } from '$lib/api';
	import LayoutGrid, { Cell as GridCell } from '@smui/layout-grid';
	import { t } from '$lib/translations';
	import DataTable, { Body, Head, Row, Cell } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import type { Load } from '@sveltejs/kit';
	import Fab, { Label as FabLabel, Icon as FabIcon } from '@smui/fab';
	import { goto } from '$app/navigation';

	type Params = Record<string, never>;
	type InputProps = Record<string, never>;
	type OutputProps = { sites: Site[] };

	export const load: Load<Params, InputProps, OutputProps> = async () => {
		try {
			const sites = await apiClient.getSites();
			return {
				props: {
					sites
				}
			};
		} catch (e) {
			console.error(e);
		}

		return {
			status: 500
		};
	};
</script>

<script lang="ts">
	export let sites: Site[] = [];
</script>

<div class="layout">
	<LayoutGrid>
		<GridCell spanDevices={{ desktop: 3, tablet: 1, phone: 0 }} />
		<GridCell spanDevices={{ desktop: 6, tablet: 10, phone: 12 }}>
			<DataTable style="width: 100%">
				<Head>
					<Row>
						<Cell hidden>{$t('admin_page.table_id')}</Cell>
						<Cell style="width: 100%">{$t('admin_page.table_address')}</Cell>
						<Cell />
					</Row>
				</Head>
				<Body>
					{#each sites as site (site.id)}
						<Row on:click={() => console.log('click')}>
							<Cell hidden>{site.id}</Cell>
							<Cell>{site.address}</Cell>
							<Cell>
								<span class="edit">
									<IconButton class="material-icons" on:click={() => goto(`/admin/site/${site.id}`)}
										>edit</IconButton
									>
								</span>
							</Cell>
						</Row>
					{/each}
				</Body>
			</DataTable>
		</GridCell>
		<GridCell spanDevices={{ desktop: 3, tablet: 1, phone: 0 }} />
	</LayoutGrid>
</div>
<div class="add-fab">
	<Fab color="primary" on:click={() => goto('/admin/site/new')} extended>
		<FabIcon class="material-icons">add</FabIcon>
		<FabLabel>{$t('admin_page.add_site')}</FabLabel>
	</Fab>
</div>

<style lang="scss">
	@use '../../lib/theme/app';
	.add-fab {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
	}

	.edit {
		color: app.$primary;
	}

	.layout {
		padding-bottom: 4rem;
	}
</style>
