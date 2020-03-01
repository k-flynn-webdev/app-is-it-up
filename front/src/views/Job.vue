<template>

	<card>
		<job-render :attrs=attrs :job=job>
			<div class="text-right">
				<button-c ref="btn_update" @click=OnUpdate> Update</button-c>
				<div style="display:inline-block;width:1rem;"></div>
				<button-c ref="btn_delete" @click=OnDelete> Delete</button-c>
				<div style="display:inline-block;width:1rem;"></div>
			</div>
		</job-render>
	</card>

</template>

<script>

	import Card from '@/components/Card.vue'
	import ButtonC from '@/components/ButtonC.vue'
	import JobRender from '@/components/Job.vue'
	import JobService from '../helpers/JobService.js'
	import jobVars from '../constants/job.js'
	import sharedVars from '../constants/sharedVars.js'

	export default {
		name: 'Job',
		data () {
			return {
				waiting: false,
				/**
				 * Used to make sure we dont send the same update twice
				 */
				checkSum: null,
				attrs: {
					active: [true, false],
					pings: jobVars.pings,
					methods: ['GET', 'POST', 'PUT', 'DELETE'],
				},
				job: {
					active: false,
					status: false,
					fails: [],
					url: '',
					ping: 0,
					method: '',
					params: '',
					meta: {
						max: 0,
						num: 0,
						next: '',
					},
					periods: {
						day: 0,
						week: 0,
						month: 0,
					},
					user: '',
					job_hash: '',
				},
			}
		},
		components: {
			Card,
			ButtonC,
			JobRender,
		},

		mounted () {
			this.GetJob()
		},

		methods: {
			createCheckSum (input) {
				return (input.url + input.method + input.params + input.ping + input.user.toString() + input.active)
			},
			GetJob: function () {
				JobService.get(this.$route.params.job_hash)
					.then(response => {
						this.job = response.data.data.job
						this.job.full = true
						this.checkSum = this.createCheckSum(this.job)
					})
					.catch(error => {
						this.$root.$emit('message', error.response.data.message || error)
					})
			},
			OnValidate: function () {

				if (this.job.url.length < 4) return false
				if (this.job.method === '') return false
				if (this.job.ping === '') return false

				// todo
				return true
			},
			OnUpdate: function () {
				event.preventDefault()

				if (!this.OnValidate()) {
					return
				}

				if (this.checkSum === this.createCheckSum(this.job)) {
					return this.$root.$emit('message', 'No change to send.')
				}

				JobService.update(this.job)
					.then(response => {
						this.$refs.btn_update.OnSuccess()
						this.$root.$emit('message', response.data.message)
						this.resetWaiting()
						this.checkSum = this.createCheckSum(this.job)
					})
					.catch(error => {
						this.$refs.btn_update.OnFail()
						this.$root.$emit('message', error.response.data.message || error)
						this.resetWaiting()
					})
			},
			OnDelete: function () {
				if (this.waiting) {
					return
				}
				this.waiting = true

				JobService.remove({ job_hash: this.$route.params.job_hash })
					.then(response => {
						this.$refs.btn_delete.OnSuccess()
						this.$root.$emit('message', response.data.message)

						setTimeout(() => {
							this.$router.push({ name: 'home' })
						}, sharedVars.page_push)

					})
					.catch(error => {
						this.$refs.btn_delete.OnSuccess()
						this.$root.$emit('message', error.response.data.message || error)
						this.resetWaiting()
					})
			},
			resetWaiting () {
				setTimeout(() => {
					this.waiting = false
				}, sharedVars.wait_ms)
			}
		},
	}
</script>
