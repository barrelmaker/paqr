<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;

	$: ({ GetBoxes } = data);
</script>

<div class="container grid place-items-center pt-20">
	<!-- Header -->
	<h1 class="h1"><span class="gradient-heading">PAQR</span></h1>

	<!-- Create Box -->
	<div class="p-4 text-token space-y-4">
		<form method="POST" action="?/create">
			<label class="label pt-4">
				<span>Input</span>
				<input class="input" type="text" name="name" placeholder="Kitchen" autocomplete="off" />
			</label>
			<label class="label pt-4">
				<span>Description</span>
				<textarea class="textarea" rows="4" name="description" placeholder="Pots, pans, etc..." />
			</label>
			<button type="submit" class="btn gradient-button mt-4 w-full">Create</button>
		</form>
	</div>

	<!-- Box List -->
	{#if $GetBoxes.fetching}
		<!-- TODO: update loading state -->
		<p>Loading...</p>
	{:else if $GetBoxes.errors}
		<!-- TODO: update error state -->
		<p>Oopsie! {$GetBoxes.errors[0].message}</p>
	{:else if $GetBoxes.data?.boxCollection?.edges}
		<div class="grid grid-cols-4 gap-4 pt-10">
			{#each $GetBoxes.data.boxCollection.edges as box}
				<a href={`/${box?.node.id}`} class="card card-hover p-4 overflow-hidden h-44">
					<h3 class="h3 pb-2 line-clamp-2">{box?.node.name}</h3>
					<article>
						<p class="line-clamp-3">{box?.node.description}</p>
					</article>
				</a>
			{/each}
		</div>
	{/if}
</div>
