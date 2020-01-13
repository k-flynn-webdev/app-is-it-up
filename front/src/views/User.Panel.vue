<template>
	<card>
		<h1>User Account</h1>
		<form class="form flex-items flex-wrap" @submit.prevent="onSubmit">

			<div class="option block">
				<label for="name"> Name </label>
				<input id="name" minLength="4" type="string" name="name"
							 placeholder="name" v-model="user.name">
			</div>
			<div class="option block">
				<label for="email"> Email </label>
				<input id="email" minLength="4" type="email" name="email"
							 placeholder="me @ me.com" v-model="user.email">
			</div>
			<div class="option block">
				<label for="password"> Password </label>
				<input id="password" minLength="8" type="password" name="password"
							 placeholder="* * *" v-model="user.password">
			</div>

		</form>

		<div class="option block">
			<h1>User Details</h1>

			<div class="text-left">
				<p> Role: {{ userControl.role }} </p>
				<p> ID: {{ userControl.id }} </p>
				<p> Created: {{ userControl.meta.created }} </p>
				<p> Login: {{ userControl.meta.login }} </p>
				<p> Verified: {{ userControl.meta.verified }} </p>
			</div>

		</div>


		<div style="text-align: right;">
			<button-c ref="btn_update" class="button" :disabled="!hasChanged" @click="onSubmit">
				<span>Update</span>
			</button-c>
		</div>
	</card>
</template>

<script>
	import Card from '@/components/Card.vue'
	import ButtonC from '@/components/ButtonC.vue'

	import UserService from '../helpers/UserService.js'
	import sharedVars from '../constants/sharedVars.js'

	export default {
		name: 'user-panel',
		components: {
			ButtonC,
			Card
		},
		data () {
			return {
				/**
				 * Used to make sure we dont send the same update twice
				 */
				checkSum: null,
				waiting: false,
				userControl: {
					name: '',
					email: '',
					password: '',
					meta: {
						login: '',
						created: '',
						verified: ''
					}
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
				if (this.userControl.name !== this.user.name && this.user.name !== '') {
					return true
				}
				if (this.userControl.email !== this.user.email && this.user.email !== '') {
					return true
				}
				if (this.user.password !== '') {
					return true
				}
				return false
			}
		},

		mounted () {
			this.getUser()
		},

		methods: {
			createCheckSum (input) {
				return (input.name + input.email + input.password)
			},
			getUser () {
				UserService.get()
					.then(response => {
						this.updateUser(response.data.data.account)
						this.checkSum = this.createCheckSum(this.job)
					})
					.catch(err => {
						this.$root.$emit('message', err.response.data.message)
					})
			},
			renderTime (input) {
				let local = new Date(input)
				let dates = local.toLocaleDateString()
				let time = `${local.getHours()}:${local.getMinutes()}`
				return (dates + ', ' + time)
			},
			updateUser (user) {
				this.userControl.name = user.name
				this.userControl.email = user.email
				this.userControl.password = ''
				this.userControl.role = user.role
				this.userControl.meta.login = this.renderTime(user.meta.login)
				this.userControl.meta.created = this.renderTime(user.meta.created)
				this.userControl.meta.verified = user.meta.verified
				this.userControl.id = user.id

				this.user.name = user.name
				this.user.email = user.email
				this.user.password = ''
			},
			onSubmit: function () {

				if (this.checkSum === this.createCheckSum(this.userControl)) {
					return this.$root.$emit('message', 'No change to send.')
				}

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
						this.$refs.btn_update.OnSuccess()
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('user')
						this.resetWaiting()
						this.updateUser()
					})
					.catch(error => {
						this.$refs.btn_update.OnFail()
						this.$root.$emit('message', error.response.data.message)
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

</style>


