<template>
	<a href="#home" @click.stop="onLogout">Logout</a>
</template>

<script>

	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-logout',
		methods: {
			onLogout: function () {
				UserService.logout()
					.then(response => {
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
					})
					.catch(err => {
						this.$root.$emit('message', err.response.data.message)
					})
			}
		}
	}
</script>

