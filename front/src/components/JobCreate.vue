<template>

	<card>
		<form @submit.prevent="OnSubmit">
			<job-render :attrs=attrs :job=job>

				<div style="text-align:right;">
					<button-c ref="btn_create" :disabled="validURL" @click=OnSubmit>
						<span>Create</span>
					</button-c>
				</div>

			</job-render>
		</form>
	</card>

</template>

<script>

	import Card from '@/components/Card.vue'
	import ButtonC from '@/components/ButtonC.vue'
	import JobRender from '@/components/Job.vue'
	import JobService from '../helpers/JobService.js'
	import jobVars from '../constants/job.js'
	import sharedVars from '../constants/sharedVars.js'

	const defaultJob = {
		active: true,
		url: '',
		params: '',
		method: 'GET',
		ping: 30,
		full: false,
	}

	export default {
		name: 'JobCreate',
		data () {
			return {
				waiting: false,
				attrs: {
					active: [true, false],
					pings: jobVars.pings,
					methods: ['GET', 'POST', 'PUT', 'DELETE'],
				},
				job: {
					active: true,
					url: '',
					params: '',
					method: 'GET',
					ping: 30,
					full: false,
				},
			}
		},
		components: {
			ButtonC,
			Card,
			JobRender,
		},
		computed: {
			validURL () {
				if (this.job.url !== '') return false
				return true
			}
		},
		methods: {
			OnValidate: function () {

				if (this.job.url.length < 4) return false
				if (this.job.method === '') return false
				if (this.job.ping === '') return false

				// todo
				return true
			},
			OnSubmit: function () {
				if (!this.OnValidate()) {
					return
				}

				if (this.waiting) {
					return
				}
				this.waiting = true

				JobService.create(this.job)
					.then(response => {
						this.$refs.btn_create.OnSuccess()
						this.$root.$emit('message', response.data.message)
						this.$root.$emit('add-job', response.data.data.job)
						this.resetJob()
						this.resetWaiting()
					})
					.catch(error => {
						this.$refs.btn_create.OnFail()
						this.$root.$emit('message', error.response.data.message || error)
						this.resetWaiting()
					})

			},
			resetJob () {
				this.job.active = defaultJob.active
				this.job.url = defaultJob.url
				this.job.params = defaultJob.params
				this.job.method = defaultJob.method
				this.job.ping = defaultJob.ping
				this.job.full = defaultJob.full
			},
			resetWaiting () {
				setTimeout(() => {
					this.waiting = false
				}, sharedVars.wait_ms)
			}
		},

	}
</script>

<style>

</style>
