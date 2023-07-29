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

	$: addContent = () => {
		console.log('addContent');
	};
	$: editContent = () => {
		console.log('editContent');
	};
	$: deleteContent = () => {
		console.log('deleteContent');
	};
	$: deleteBox = () => {
		console.log('deleteBox');
	};
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
		<button class="button" on:click={deleteBox}>Delete Box</button>

		<!-- Content List -->
		{#if $GetBox.data?.box?.contents?.edges}
			<ul class="list">
				{#each $GetBox.data.box.contents.edges as content}
					<!-- Content -->
					<li class="content">
						<h3>{content?.node.name}</h3>
						<div class="contentActions">
							<!-- Update Content -->
							<button class="button" on:click={editContent}>Edit</button>

							<!-- Delete Content -->
							<button class="button" on:click={deleteContent}>Delete</button>
						</div>
					</li>
				{/each}

				<!-- Create Content -->
				<li class="content">
					<h3>{'New Content'}</h3>

					<!-- Update Content -->
					<button class="button" on:click={addContent}>Add</button>
				</li>
			</ul>
		{/if}
	{/if}
</div>
