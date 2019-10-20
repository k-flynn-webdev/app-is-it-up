<template>

  <div class="job-widget colour-bg">

      <div class="sect status">
        <p class="widget-label"> status </p>  
      </div>

      <div class="sect url">
        <div>
          <span class="widget-label"> url </span>  
        </div>
      </div>

      <div class="sect period">
        <p class="widget-label"> period </p>  
      </div>

      <div class="sect ping">
        <p class="widget-label"> ping </p>  
      </div>

    <template v-for="job in jobs">
      <JobWidget v-bind:key=job.job_id v-bind:job=job />
    </template>

  </div>
</template>



<script>

import JobWidget from './JobWidget.vue';

export default {
  name: 'JobList',
  props: {
    jobs : Array,
  },
  created(){
  },
  computed : {    
  },
  methods : {
  },
  mounted(){
  },
  components: {
    JobWidget,
  },
}

</script>


<style>
</style>
