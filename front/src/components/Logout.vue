<template>
	<a href="#home" @click.stop="onLogout">Logout</a>
</template>

<script>

	import UserService from '../helpers/UserService.js'

	import Paths from '../constants/paths.js'

	export default {
		name: 'user-logout',
		data () {
			return {
				waiting: false,
			}
		},
		methods: {
			onLogout: function () {
				if (this.waiting) {
					return
				}
				this.waiting = true
				UserService.logout()
					.then(response => {
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
						this.$router.push({ name: Paths['HOME']})
					})
					.catch(err => {
						this.$root.$emit('message', err.response.data.message)
						this.resetWaiting()
					})
			},
			resetWaiting () {
				setTimeout(() => {
					this.waiting = false
				}, 500)
			}
		}
	}
</script>

