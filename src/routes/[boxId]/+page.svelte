<script>
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	onMount(() => {
		const canvas = document.getElementById('canvas');
		QRCode.toCanvas(canvas, window.location.href);
	});

	$: data = {
		name: 'Box Name',
		description: 'Box Description',
		contents: [
			{
				name: 'Content 1'
			},
			{
				name: 'Content 2'
			},
			{
				name: 'Content 3'
			}
		]
	};

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
	<!-- Box Name -->
	<h1>{data.name}</h1>

	<!-- QR Code -->
	<canvas id="canvas" class="qrcode" />

	<!-- Box Description -->
	<h4>{data.description}</h4>

	<!-- Delete Box -->
	<button class="button" on:click={deleteBox}>Delete Box</button>

	<!-- Content List -->
	<ul class="list">
		{#each data.contents as content}
			<!-- Content -->
			<li class="content">
				<h3>{content.name}</h3>
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

	<div />
</div>
