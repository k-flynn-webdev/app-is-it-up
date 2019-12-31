<template>
	<div class="home">
		<JobCreate v-on:success="GetJobs"/>
		<JobList v-bind:jobs="jobs"/>
	</div>
</template>

<script>

	import JobService from '../helpers/JobService.js'

	import JobCreate from '@/components/JobCreate.vue'
	import JobList from '@/components/JobList.vue'

	export default {
		name: 'home',
		data () {
			return {
				jobs: [],
			}
		},
		components: {
			JobCreate,
			JobList
		},
		methods: {
			GetJobs: function () {
				JobService.all()
					.then(response => {
						this.jobs.length = 0
						this.jobs = response.data.data.jobs
					})
					.catch(error => {
						this.$root.$emit('message', error.response.data.message)
					})
			},
			AddJob: function (job) {
				this.jobs.push(job)
			},
		},
		mounted () {
			this.$root.$on('add-job', this.AddJob)
			// todo remove job check
			this.$root.$on('remove-job', this.AddJob)
			this.$root.$on('get-jobs', this.GetJobs)
			this.GetJobs()
		},
	}
</script>

<style>
</style>


