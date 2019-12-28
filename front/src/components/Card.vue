<template>

	<div class="card shadow">

		<slot></slot>

	</div>

</template>

<script>
	export default {
		name: 'Card',
	}
</script>


<style>

.card {
	margin: 2rem 1rem;
	padding: 0.5rem;
	overflow: hidden;
}

.card, .button {
	border-radius: var(--border-radius);
	background-color: var(--colour-dark);
}

@media (max-width: 360px) {
	.card {
		margin: 1.25rem 0.25rem;
		padding: 0.5rem;
  }
}
</style>