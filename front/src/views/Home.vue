<template>
    <div class="home">
        <div class="register">
            <router-link class="register" to="/user/create">Register</router-link>
            <router-link class="login" to="/user/login">Login</router-link>
            <router-link class="logout" to="/user/logout">Logout</router-link>
        </div>
        <JobCreate v-on:success=GetJobs />
        <JobList v-bind:jobs=jobs />
    </div>
</template>

<script>

  import JobCreate from '@/components/JobCreate.vue'
  import JobList from '@/components/JobList.vue'
  import JobService from '../helpers/JobService.js'

  export default {
    name: 'home',
    data () {
      return {
        jobs: [],
      }
    },
    components: {
      JobCreate,
      JobList,
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
      this.$root.$on('add-job', this.AddJob)
      this.$root.$on('get-jobs', this.GetJobs)
      this.GetJobs()
    },
  }
</script>


<style>
    .register {
        text-align: right;
    }
</style>


