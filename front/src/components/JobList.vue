<template>

  <div class="job-list colour-bg">

    <table>
      
      <thead>
          <tr class="row-split-head">
              <th class="label">status</th>
              <th class="label">url</th>
              <th class="label" v-on:click=togglePeriod>{{ getPeriod }}</th>
              <th class="label">ping</th>
          </tr>
      </thead>

      <tbody>

        <template v-for="job in jobs">
          <JobWidget v-bind:key=job.job_id v-bind:job=job v-bind:period=getPeriod />
        </template>

      </tbody>

    </table>

  </div>

</template>



<script>

import JobWidget from './JobWidget.vue';

export default {
  name: 'JobList',
  data(){
    return {
      period : 0,
      attrs : {
        periods : ['day','week','month'],
      },
    }
  },
  props: {
    jobs : Array,
  },
  created(){
  },
  computed : { 
    getPeriod(){
      return this.attrs.periods[this.period];
    },  
  },
  methods : {
    togglePeriod : function(){
      this.period +=1;
      if(this.period > 2) this.period = 0;
    },
  },
  mounted(){
  },
  components: {
    JobWidget,
  },
}

</script>


<style>

.job-list {
  border-radius: var(--border-radius);
  border: 1px solid var(--colour-dark);
  margin: .5rem;
  margin-bottom: 1rem; 
}

.job-list table {
  margin: .5rem 0;
  width: 100%;
}

.job-list .row-split-head {
  height: 1.5rem;
  border-bottom: 1px solid hsla(1,10%,50%,0.33);
}


.job-list .row-split {
   height: 2rem;
}
.job-list .row-split:not(:last-child) {
  border-bottom: 1px solid hsla(1,10%,50%,0.33);
}
.job-list .row-split:hover {
  background-color: hsla(1,1%,66%,.75);
}

</style>
