<template>
	<card>
		<h1>User</h1>
		<form class="form" @submit.prevent="onSubmit">
			<div class="form-item-block">
				<label for="name"> Name </label>
				<input id="name" minLength="4" type="string" name="name"
							 placeholder="name" v-model="user.name">
			</div>
			<div class="form-item-block">
				<label for="email"> Email </label>
				<input id="email" minLength="4" type="email" name="email"
							 placeholder="me @ me.com" v-model="user.email">
			</div>
			<div class="form-item-block">
				<label for="password"> Password </label>
				<input id="password" minLength="8" type="password" name="password"
							 placeholder="* * *" v-model="user.password">
			</div>
			<div v-if="hasChanged" style="text-align: right;">
				<button class="button" @click="onSubmit">Update</button>
			</div>
		</form>
	</card>
</template>

<script>
	import Card from '@/components/Card.vue'
	import UserService from '../helpers/UserService.js'

	export default {
		name: 'user-panel',
		components: {
			Card,
		},
		data () {
			return {
				waiting: false,
				userControl: {
					name: '',
					email: '',
					password: '',
				},
				user: {
					name: '',
					email: '',
					password: '',
				},
			}
		},
		computed: {
			hasChanged () {
				if (this.userControl.name !== this.user.name) {
					return true
				}
				if (this.userControl.email !== this.user.email) {
					return true
				}
				if (this.user.password.length > 0) {
					return true
				}
				return false
			}
		},
		mounted () {
			this.updateUser()
		},
		methods: {
			updateUser () {
				let tmp = UserService.get_payload()
				this.userControl.name = tmp.name
				this.userControl.email = tmp.email
				this.user.name = tmp.name
				this.user.email = tmp.email
			},
			onSubmit: function () {
				if (this.waiting) {
					return
				}
				this.waiting = true

				// todo : validate all input

				// what changed??
				let newUser = {}

				if (this.userControl.name !== this.user.name) {
					newUser.name = this.user.name
				}
				if (this.userControl.email !== this.user.email) {
					newUser.email = this.user.email
				}
				if (this.user.password.length > 0) {
					newUser.password = this.user.password
				}

				return UserService.update(newUser)
					.then(response => {
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
						this.updateUser()
						this.resetWaiting()
					})
					.catch(error => {
						this.$root.$emit('message', error.response.data.message)
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


