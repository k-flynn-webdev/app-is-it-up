<template>
	<card>
		<h1>Register</h1>
		<form class="form" @submit.prevent="onSubmit">
			<div class="form-item-block">
				<label for="name"> Name </label>
				<input id="name" minLength="4" required type="string" name="name" placeholder="Name"
							 v-model="user.name">
			</div>
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
				<button class="button" @click="onSubmit">Create</button>
			</div>
		</form>
	</card>
</template>

<script>
	import Paths from '@/constants/paths'
	import sharedVars from '../constants/sharedVars.js'
	import Card from '@/components/Card.vue'
	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-create',
		data () {
			return {
				waiting: false,
				user: {
					name: '',
					email: '',
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
				return UserService.create(this.user)

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


