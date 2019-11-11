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
    GetStack : function(){
      JobService.stack().then(response => {
        this.stack.length = 0;
        this.stack = response.data.data.jobs;
        this.$root.$emit('message', 'success');
      }).catch(error => {
        this.$root.$emit('message', error.response.data.message);
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