<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;
	console.log(data);

	$: ({ GetBoxes } = data);
</script>

<div class="container">
	<!-- Header -->
	<h1>Paqr</h1>

	<!-- Create Box -->
	<form method="POST" action="?/create">
		<label for="name">
			Name
			<input type="name" id="name" name="name" placeholder="Name" />
		</label>
		<label for="description">
			Description
			<input type="description" id="description" name="description" placeholder="Description" />
		</label>
		<button>Create</button>
	</form>

	<!-- Box List -->
	{#if $GetBoxes.fetching}
		<p>Loading...</p>
	{:else if $GetBoxes.errors}
		<p>Oopsie! {$GetBoxes.errors[0].message}</p>
	{:else if $GetBoxes.data?.boxCollection?.edges}
		<div class="grid">
			{#each $GetBoxes.data.boxCollection.edges as box}
				<a href={`/${box?.node.id}`}>
					<article>
						<h3>{box?.node.name}</h3>
						<p>{box?.node.description}</p>
					</article>
				</a>
			{/each}
		</div>
	{/if}
</div>
