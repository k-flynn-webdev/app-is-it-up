<template>
	<card>

		<div v-if="!isReset">
			<h1>Login</h1>
			<form class="form" @submit.prevent="onSubmit">
				<div class="form-item-block">
					<label for="email"> Email </label>
					<input id="email" minLength="4" required type="email" name="email"
								 placeholder="me @ me.com" v-model="user.email">
				</div>
				<div class="form-item-block">
					<label for="password"> Password </label>
					<input id="password" minLength="8" required type="password" name="password"
								 placeholder="* * *" v-model="user.password">
				</div>
				<div style="text-align: right;">
					<button class="button" @click="onSubmit">Login</button>
				</div>
			</form>

			<button class="button small" @click="isReset = true">Forgotten my password</button>

		</div>

		<div v-else>
			<h1>Reset Password</h1>
			<form class="form" @submit.prevent="onReset">
				<div class="form-item-block">
					<label for="email"> Email </label>
					<input id="email" minLength="4" required type="email" name="email"
								 placeholder="me @ me.com" v-model="user.email">
				</div>
				<div style="text-align: right;">
					<button class="button" @click="onReset">Reset Confirm</button>
				</div>
			</form>

			<button class="button small" @click="isReset = false">Login</button>

		</div>

	</card>
</template>

<script>
	import Paths from '@/constants/paths'
	import Card from '@/components/Card.vue'
	import sharedVars from '../constants/sharedVars.js'
	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-login',
		data () {
			return {
				waiting: false,
				isReset: false,
				user: {
					email: '',
					password: '',
				},
			}
		},
		components: {
			Card,
		},
		methods: {
			onReset () {
				if (this.waiting) {
					return
				}
				this.waiting = true
				// todo : validate all input
				return UserService.resetStart(this.user)
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
			onSubmit: function () {
				if (this.waiting) {
					return
				}
				this.waiting = true
				// todo : validate all input
				return UserService.login(this.user)
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


<style>
.form {
	margin: .5rem 0.5rem 1rem 0.5rem;
}

.form-item-block {
	margin: 0 auto;
}

.form-item-block input {
	width: 100%;
	margin-bottom: 1rem;
}
</style>


