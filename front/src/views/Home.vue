<template>
  <div class="home">
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
  },
  mounted(){
    this.GetJobs();
  },
}
</script>


<style>
  .button {
  border-radius: var(--border-radius);
  font-weight: bold;
  color: var(--colour-bg);
  background-color: var(--colour-dark);
  margin-top: 1rem;
}
</style>