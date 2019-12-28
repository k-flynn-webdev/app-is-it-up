<template>
	<div id="app">

		<nav-bar>
			<message-c/>
		</nav-bar>

		<router-view/>
		<Footer/>
	</div>
</template>


<script>

	// adding global style ..
	require('@/assets/style/reset.css')
	require('@/assets/style/default.css')
	require('@/assets/style/colour.css')
	require('@/assets/style/text.css')

	import NavBar from '@/components/NavBar.vue'
	import MessageC from '@/components/MessageC.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'App',
		created () {
			document.title = process.env.VUE_APP_NAME
			// this.$store.dispatch('user/init', this.$request.get_SecureKeyFile );
		},
		data () {
			return {
				user: null
			}
		},
		computed: {
			hasUser () {
				if (!this.user) {
					return false
				}
				return true
			}
		},
		mounted () {
		},
		beforeDestroy () {
		},
		components: {
			NavBar,
			MessageC,
			Footer
		},
	}

</script>


<style>

body {
	background-color: var(--colour-bg);
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

p, h1, h2, h3, a, a:visited, .text, .label, label {
	color: var(--colour-pop);
}

label, .label {
	padding-bottom: .35rem;
}

.button {
	margin-top: .5rem;
	font-weight: bold;
	color: var(--colour-pop);
	border: 1px solid var(--colour-pop);
	background-color: var(--colour-dark);
	transition: .2s;
}

button:focus, .button:focus {
	background-color: hsla(210, 33%, 75%, .5);
	border: 1px solid white;
}

.button:hover, .button:active {
	background-color: var(--colour-mid);
}

.button.success {
	background-color: var(--colour-success);
}

.button.fail {
	background-color: var(--colour-fail);
}

input, select {
	padding: 0 .5rem;
	color: var(--colour-pop);
	border: 2px solid transparent;
	border-bottom: 2px solid black;
	outline: var(--colour-bg);
	background-color: var(--colour-bg);
}

input {
	border-radius: var(--border-radius);
}

input:focus, select:focus {
	outline: 2px solid white;
}


</style>
