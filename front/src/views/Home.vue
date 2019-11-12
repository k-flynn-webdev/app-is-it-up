<template>
  <div class="home">
    <div class="sign-up">
      <router-link class="sign-up" to="/user/create">Sign Up</router-link>
    </div>
    <JobCreate v-on:success=GetJobs />
    <JobList v-bind:jobs=jobs />
  </div>
</template>

<script>

import JobCreate from '@/components/JobCreate.vue'
import JobList from '@/components/JobList.vue'
import JobService from '../helpers/JobService.js';

export default {
  name: 'home',
  data(){
    return {
      jobs : [],
    }
  }, 
  components: {
    JobCreate,
    JobList,
  },
  methods : {
    GetJobs : function(){
      JobService.get_all().then(response => {
        this.jobs.length = 0;
        this.jobs = response.data.data.jobs;
      }).catch(error => {
        console.log(error);
      });
    },
    AddJob : function(job){
      this.jobs.push(job);
    },
  },
  mounted(){
    this.$root.$on('add-job', this.AddJob );
    this.$root.$on('get-jobs', this.GetJobs );
    this.GetJobs();
  },
}
</script>


<style>
.sign-up {
  text-align: right;
}
</style>


