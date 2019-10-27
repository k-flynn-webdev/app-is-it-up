<template>

  <card>

    <table>
      
      <thead>
          <tr class="row-split-head">
              <th class="label">status</th>
              <th class="label">url</th>
              <th class="label" style="width:" v-on:click=togglePeriod>{{ getPeriod }}</th>
              <th class="label">ping</th>
          </tr>
      </thead>

      <tbody>

        <template v-for="job in jobs">
          <job-list-render v-bind:key=job.job_id v-bind:job=job v-bind:period=getPeriod />
        </template>

      </tbody>

    </table>

  </card>

</template>



<script>

import Card from '@/components/Card.vue'
import JobListRender from './JobListRender.vue';

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
    Card,
    JobListRender,
  },
}

</script>


<style>

table {
  margin: .5rem 0;
  width: 100%;
}

.row-split-head {
  height: 1.5rem;
  border-bottom: 1px solid var(--colour-bg);
}

.row-split-head .label {
  transform: translateY(-.33rem);
}

.row-split {
  color: var(--colour-mid);
  height: 2rem;
}
.row-split:not(:last-child) {
  border-bottom: 1px solid var(--colour-bg);
}
.row-split:hover {
  color: var(--colour-bg);
  background-color: var(--colour-mid);
}

</style>
