<template>
    <div class="home">
        <JobCreate v-on:success=GetJobs />
        <JobList v-bind:jobs=jobs />
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
            console.log(error)
          })
      },
      AddJob: function (job) {
        this.jobs.push(job)
      },
    },
    mounted () {
      this.$root.$on('user', this.GetJobs)
      this.$root.$on('add-job', this.AddJob)
      this.$root.$on('get-jobs', this.GetJobs)
      this.GetJobs()
    },
  }
</script>

<style>
</style>


