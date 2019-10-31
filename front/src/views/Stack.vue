<template>
  <div class="stack">
    <p class="text"> Jobs on the stack ({{ stack.length }})</p>
    <JobList v-bind:jobs=stack></JobList>
  </div>
</template>

<script>

import JobList from '@/components/JobList.vue'
import JobService from '../helpers/JobService.js';

export default {
  name: 'stack',
  data(){
    return {
      stack : [],
    }
  }, 
  components: {
    JobList,
  },
  methods : {
    getStatus(input){
      if( !input.active ) return 'in-active';
      if( !input.status ) return 'down';
      return 'active';
    },
    GetStack : function(){
      JobService.stack().then(response => {
        this.stack.length = 0;
        this.stack = response.data.data.jobs;
      }).catch(error => {
        console.log(error);
      });
    },
  },
  mounted(){
    this.GetStack();
  },
}
</script>


<style>
.stack {
  width: 100%;
  text-align: center;
}
</style>