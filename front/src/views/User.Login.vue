<template>
  <div class="card shadow">
    <h1>Login</h1>
    <form>
      <div class="form-item-block">
        <label for="name"> Name </label>
        <input minLength="4" required type="string" name="name" placeholder="Name">
      </div>
      <div class="form-item-block">
        <label for="email"> Email </label>
        <input minLength="4" required type="email" name="email" placeholder="me @ me.com">
      </div>
      <div class="form-item-block">
        <label for="password"> Password </label>
        <input minLength="8" required type="password" name="password" placeholder="password">
      </div>
      <div style="text-align: right;">
        <button class="button">Create</button>      
      </div>
    </form>
  </div>
</template>

<script>

import Card from '@/components/Card.vue'
// import JobList from '@/components/JobList.vue'
// import JobService from '../helpers/JobService.js';

export default {
  name: 'user',
  data(){
    return {
      user : {
        name: '',
        email: '',
        password: '',  
      },
    }
  }, 
  components: {
    Card,
    // JobList,
  },
  methods : {
    // GetJobs : function(){
    //   JobService.get_all().then(response => {
    //     this.jobs.length = 0;
    //     this.jobs = response.data.data.jobs;
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // },
    // AddJob : function(job){
      // this.jobs.push(job);
    // },
  },
  mounted(){
    // this.$root.$on('add-job', this.AddJob );
    // this.$root.$on('get-jobs', this.GetJobs );
    // this.GetJobs();
  },
}
</script>


<style>
form {
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


