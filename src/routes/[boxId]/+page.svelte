<script lang="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	import type { PageData } from './$houdini';
	export let data: PageData;
	$: ({ GetBox } = data);

	// Create QR Code
	onMount(() => {
		const canvas = document.getElementById('canvas');
		QRCode.toCanvas(canvas, window.location.href);
	});
</script>

<div class="container">
	{#if $GetBox.fetching}
		<p>Loading...</p>
	{:else if $GetBox.errors}
		<p>Oopsie! {$GetBox.errors[0].message}</p>
	{:else}
		<!-- Box Name -->
		<h1>{$GetBox.data?.box?.name}</h1>

		<!-- QR Code -->
		<canvas id="canvas" />

		<!-- Box Description -->
		<h4>{$GetBox.data?.box?.description}</h4>

		<!-- Delete Box -->
		<form method="POST" action="?/deleteBox">
			<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
			<button>Delete Box</button>
		</form>

		<!-- Content List -->
		{#if $GetBox.data?.box?.contents?.edges}
			<div>
				{#each $GetBox.data.box.contents.edges as content}
					<!-- Content -->
					<div>
						<!-- Update -->
						<form method="POST" action="?/update">
							<input name="name" value={content?.node.name} />
							<input name="contentId" type="hidden" value={content?.node.id} />
							<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
							<button class="secondary outline">
								<i data-feather="edit-2" />
							</button>
						</form>

						<!-- Delete -->
						<form method="POST" action="?/delete">
							<input name="contentId" type="hidden" value={content?.node.id} />
							<button class="secondary outline"> <i data-feather="trash-2" /> </button>
						</form>
					</div>
				{/each}

				<!-- Create Content -->
				<form method="POST" action="?/create">
					<div>
						<input name="name" />
						<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
						<button>Add</button>
					</div>
				</form>
			</div>
		{/if}
	{/if}

	<script>
		feather.replace();
	</script>
</div>
