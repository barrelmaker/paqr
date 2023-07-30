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

<div class="root">
	{#if $GetBox.fetching}
		<p>Loading...</p>
	{:else if $GetBox.errors}
		<p>Oopsie! {$GetBox.errors[0].message}</p>
	{:else}
		<!-- Box Name -->
		<h1>{$GetBox.data?.box?.name}</h1>

		<!-- QR Code -->
		<canvas id="canvas" class="qrcode" />

		<!-- Box Description -->
		<h4>{$GetBox.data?.box?.description}</h4>

		<!-- Delete Box -->
		<form method="POST" action="?/deleteBox">
			<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
			<button class="button">Delete Box</button>
		</form>

		<!-- Content List -->
		{#if $GetBox.data?.box?.contents?.edges}
			<ul class="list">
				{#each $GetBox.data.box.contents.edges as content}
					<!-- Content -->
					<li class="content">
						<!-- Update -->
						<form method="POST" action="?/update">
							<input name="name" value={content?.node.name} />
							<input name="contentId" type="hidden" value={content?.node.id} />
							<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
							<button class="button">Edit</button>
						</form>

						<!-- Delete -->
						<form method="POST" action="?/delete">
							<input name="contentId" type="hidden" value={content?.node.id} />
							<button class="button">Delete</button>
						</form>
					</li>
				{/each}

				<!-- Create Content -->
				<form method="POST" action="?/create">
					<li class="content">
						<input name="name" />
						<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
						<button class="button">Add</button>
					</li>
				</form>
			</ul>
		{/if}
	{/if}
</div>
