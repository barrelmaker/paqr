<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;
	console.log(data);

	$: ({ GetBoxes } = data);
</script>

<div class="root">
	<!-- Header -->
	<h1>Paqr</h1>

	<!-- Create Box -->
	<form method="POST" action="?/create">
		<label>
			<h3>Name</h3>
			<input name="name" type="name" />
		</label>
		<label>
			<h3>Description</h3>
			<input name="description" type="description" />
		</label>
		<button class="button">Create</button>
	</form>

	<!-- Box List -->
	{#if $GetBoxes.fetching}
		<p>Loading...</p>
	{:else if $GetBoxes.errors}
		<p>Oopsie! {$GetBoxes.errors[0].message}</p>
	{:else if $GetBoxes.data?.boxCollection?.edges}
		<div class="grid-container" style="padding-top: 32px;">
			{#each $GetBoxes.data.boxCollection.edges as box}
				<a class="grid-item" href={`/${box?.node.id}`}>
					<h2>{box?.node.name}</h2>
					<h4>{box?.node.description}</h4>
				</a>
			{/each}
		</div>
	{/if}
</div>
