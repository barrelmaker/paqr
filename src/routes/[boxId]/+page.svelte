<script lang="ts">
	import { navigate } from 'svelte-routing';

	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	import CheckmarkIcon from '../../assets/checkmark.svelte';
	import CrossIcon from '../../assets/cross.svelte';

	import Content from './Content.svelte';

	import type { PageData } from './$houdini';
	export let data: PageData;
	$: ({ GetBox } = data);

	// Create QR Code
	onMount(() => {
		const canvas = document.getElementById('canvas');
		QRCode.toCanvas(canvas, window.location.origin + window.location.pathname);
	});

	// Edit box name
	let isEditingName = false;
	function toggleEditName() {
		isEditingName = !isEditingName;
	}

	// Edit box description
	let isEditingDescription = false;
	function toggleEditDescription() {
		isEditingDescription = !isEditingDescription;
	}

	// Redirect to home
	function redirectToHome() {
		navigate('/');
	}
</script>

<div class="container grid place-items-center pt-20">
	{#if $GetBox.fetching}
		<p>Loading...</p>
	{:else if $GetBox.errors}
		<p>Oopsie! {$GetBox.errors[0].message}</p>
	{:else}
		<!-- Box Name -->
		{#if isEditingName}
			<form method="POST" action="?/updateBox">
				<div class="flex gap-2 pb-11">
					<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />

					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						value={$GetBox.data?.box?.name}
						name="name"
						class="input"
						autofocus
						autocomplete="off"
						on:blur={toggleEditName}
					/>
					<button type="submit" class="btn-icon variant-outline-success rounded-md w-10 h-10">
						<CheckmarkIcon />
					</button>
					<button
						type="button"
						class="btn-icon variant-outline-warning rounded-md w-10 h-10"
						on:click={toggleEditName}
					>
						<CrossIcon />
					</button>
				</div>
			</form>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h1 class="h1 pb-10" on:click={toggleEditName}>{$GetBox.data?.box?.name}</h1>
		{/if}

		<!-- QR Code -->
		<canvas id="canvas" class="rounded-lg mb-8" />

		<!-- Box Description -->
		{#if isEditingDescription}
			<form method="POST" action="?/updateBox">
				<div>
					<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />

					<!-- svelte-ignore a11y-autofocus -->
					<textarea
						class="textarea"
						rows="4"
						name="description"
						value={$GetBox.data?.box?.description}
						autofocus
						autocomplete="off"
						on:blur={toggleEditDescription}
					/>

					<div class="flex gap-2 py-4">
						<button type="submit" class="btn-icon variant-outline-success rounded-md w-full h-10">
							<CheckmarkIcon />
						</button>
						<button
							type="button"
							class="btn-icon variant-outline-warning rounded-md w-full h-10"
							on:click={toggleEditDescription}
						>
							<CrossIcon />
						</button>
					</div>
				</div>
			</form>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h4 class="h4 pb-5" on:click={toggleEditDescription}>{$GetBox.data?.box?.description}</h4>
		{/if}

		<!-- Delete Box -->
		<form method="POST" action="?/deleteBox" class="mb-10" on:submit={redirectToHome}>
			<input name="boxId" type="hidden" value={$GetBox.data?.box?.id} />
			<button type="submit" class="btn variant-filled-error w-full">Delete Box</button>
		</form>

		<!-- Content List -->
		{#if $GetBox.data?.box?.contents?.edges}
			<ul class="list w-3/5">
				{#each $GetBox.data.box.contents.edges as content}
					<Content {content} boxId={$GetBox.data?.box.id} />
				{/each}

				<!-- Create Content -->
				<Content boxId={$GetBox.data?.box.id} content={null} />
			</ul>
		{/if}
	{/if}
</div>
