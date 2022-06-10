<script lang="ts">
	import Kitchen from '@smui/snackbar/kitchen';
	import type { KitchenComponentDev } from '@smui/snackbar/kitchen';
	import { setSnackbar } from '$lib/context/snackbar';

	let kitchen: KitchenComponentDev;

	const pushSnack = (message: string) => {
		kitchen.push({
			props: {
				variant: 'leading',
				timeoutMs: 4000
			},
			label: message,
			dismissButton: true
		});
	};
	setSnackbar({ push: pushSnack });
</script>

<Kitchen bind:this={kitchen} dismiss$class="material-icons" />
<slot />
