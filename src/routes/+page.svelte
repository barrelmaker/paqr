<script>
	$: createBox = () => {
		console.log('createBox');
	};
</script>

<div class="root">
	<!-- Header -->
	<h1>Paqr</h1>
	<!-- Create Box -->
	<button class="button" on:click={createBox}>Create Box</button>
	<!-- Box List -->
</div>
