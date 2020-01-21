<template>
	<span></span>
</template>

<script>
	import Paths from '@/constants/paths'
	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-verify',
		mounted () {
			this.onSubmit()
		},
		methods: {
			onSubmit: function () {
				return UserService.verify(this.$route.params.verify)

					.then(response => {
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
						this.$router.push({ name: Paths['HOME'] })
					})
					.catch(error => {
						this.$root.$emit('message', error.response.data.message || error)
						this.$router.push({ name: Paths['HOME'] })
					})

			}
		}
	}
</script>
