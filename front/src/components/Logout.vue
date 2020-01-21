<template>
	<a href="#home" @click="onLogout">Logout</a>
</template>

<script>

	import UserService from '../helpers/UserService.js'

	import Paths from '../constants/paths.js'
	import sharedVars from '../constants/sharedVars.js'

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
						this.$root.$emit('get-jobs')

						setTimeout(() => {
							this.$router.push({ name: Paths['HOME']})
						}, sharedVars.page_push)

					})
					.catch(error => {
						this.$root.$emit('message', error.response.data.message || error)
						this.resetWaiting()
					})
			},
			resetWaiting () {
				setTimeout(() => {
					this.waiting = false
				}, sharedVars.wait_ms)
			}
		}
	}
</script>

