<template>
	<div class="link-user">
		<p class="user-name">
			{{ nameRender }}
		</p>
		<a href="#home" @click.stop="onLogout">Logout</a>
	</div>
</template>

<script>

	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-logout',
		props: {
			user: Object
		},
		computed: {
			nameRender () {
				if (this.user.name && this.user.name.length > 18) {
					return this.user.name.substring(0, 16) + '..'
				}
				return this.user.name
			}
		},
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

<style>
.link-user {
	position: relative;
}

.user-name {
	position: absolute;
	right: calc(100% + 1rem);
	text-align: right;
}
</style>
