<script lang="ts">
	import CheckmarkIcon from '../../assets/checkmark.svelte';
	import CrossIcon from '../../assets/cross.svelte';
	import PenIcon from '../../assets/pen.svelte';
	import TrashIcon from '../../assets/trash.svelte';

	export let content: any;
	export let boxId: any;

	let isEditing = !content;
	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

<div class="flex gap-2 items-center !mb-4">
	{#if isEditing}
		<form method="POST" action={content ? '?/updateContent' : '?/createContent'} class="w-full">
			<div class="flex gap-2">
				<input name="boxId" type="hidden" value={boxId} />
				<input name="contentId" type="hidden" value={content?.node.id} />

				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					value={content?.node.name || ''}
					name="name"
					class="input w-full"
					on:blur={content ? toggleEdit : null}
					placeholder={content ? '' : 'Cool new item'}
					autofocus={content}
					autocomplete="off"
				/>

				<button type="submit" class="btn-icon variant-outline-success rounded-md w-10 h-10">
					<CheckmarkIcon />
				</button>

				{#if content}
					<button
						type="button"
						class="btn-icon variant-outline-warning rounded-md w-10 h-10"
						on:click={toggleEdit}
					>
						<CrossIcon />
					</button>
				{/if}
			</div>
		</form>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<p class="w-full" on:click={toggleEdit}>{content?.node.name}</p>

		<!-- Edit -->
		<button
			type="button"
			class="btn-icon variant-outline rounded-md w-10 h-10"
			on:click={toggleEdit}
		>
			<PenIcon />
		</button>

		<!-- Delete -->
		<form method="POST" action="?/deleteContent">
			<input name="contentId" type="hidden" value={content?.node.id} />
			<button class="btn-icon variant-outline-error rounded-md w-10 h-10">
				<TrashIcon />
			</button>
		</form>
	{/if}
</div>
