<template>
	<card>

		<h1>Reset Password</h1>
		<form class="form" @submit.prevent="onSubmit">
			<div class="form-item-block">
				<label for="password"> New password </label>
				<input id="password" minLength="8" required type="password" name="password"
							 placeholder="* * *" v-model="user.password">
			</div>
			<div style="text-align: right;">
				<button class="button" @click="onSubmit">Send</button>
			</div>
		</form>

	</card>
</template>

<script>
	import Paths from '@/constants/paths'
	import Card from '@/components/Card.vue'
	import sharedVars from '../constants/sharedVars.js'
	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-reset',
		data () {
			return {
				waiting: false,
				user: {
					password: '',
				},
			}
		},
		components: {
			Card,
		},
		methods: {
			onSubmit: function () {
				if (this.waiting) {
					return
				}
				this.waiting = true
				// todo : validate all input
				return UserService.resetComplete( { password: this.user.password, verify: this.$route.params.verify})
					.then(response => {
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
						setTimeout(() => {
							this.$router.push({ name: Paths['HOME'] })
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


