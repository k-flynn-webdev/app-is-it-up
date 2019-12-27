<template>
    <div class="home">

        <p>{{ user }}</p>

        <div class="nav">
            <ul class="links">
                <li v-if="!hasUser"><router-link class="register" to="/user/create">Register</router-link></li>
                <li v-if="!hasUser"><router-link class="login" to="/user/login">Login</router-link></li>
                <li v-if="hasUser"><logout /></li>
            </ul>
        </div>

        <JobCreate v-on:success=GetJobs />
        <JobList v-bind:jobs=jobs />
    </div>
</template>

<script>

  import JobService from '../helpers/JobService.js'

  import JobCreate from '@/components/JobCreate.vue'
  import JobList from '@/components/JobList.vue'
  import Logout from '@/components/Logout.vue'

  export default {
    name: 'home',
    data () {
      return {
        jobs: [],
      }
    },
    computed: {
      hasUser () {
        if (!this.user) {
          return false
        }
        return true
      }
    },
    props: {
      user: Object
    },
    components: {
      JobCreate,
      JobList,
      Logout
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
    .nav {
        text-align: right;
    }
    .nav .links {
        decorator: none;
    }
    .nav .links li{
        display: inline-block;
        margin: 0 .33rem;
    }
</style>


