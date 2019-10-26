<template>
  <card>
    <job-render :attrs=attrs :job=job>
      <div class="text-right">
        <button v-on:click=OnUpdate class="button"> Update </button>
        <div style="display:inline-block;width:1rem;"></div>  
        <button v-on:click=OnDelete class="button"> Delete </button>
      </div>
    </job-render>
  </card>

</template>

<script>

import Card from '@/components/Card.vue'
import JobRender from '@/components/Job.vue'
import JobService from '../helpers/JobService.js';

export default {
  name: 'job',
  data(){
    return {
      attrs : {
        active : [true,false],
        pings : [1,15,30,45,60],
        methods : ['GET','POST','PUT','DELETE'],
      },
      job : {
        active: false,
        status: false,
        fails: [],
        url: "",
        ping: 0,
        method: "",
        params: "",
        meta: {
          max: 0, 
          num: 0, 
          next: "",
        },
        periods: {
          day: 0, 
          week: 0, 
          month: 0,
        },
        user: "",
        job_id: "",
      },
    }
  }, 
  components: {
    Card,
    JobRender,
  },
  methods : {
    GetJob : function(){
      JobService.get_job({ job_id : this.$route.params.job_id }).then(response => {
        this.job = response.data.data.job[0];
        this.job.full = true;
      }).catch(error => {
      });
    },
    OnValidate : function(){

      if(this.job.url.length < 4)  return false;
      if(this.job.method === '')  return false;
      if(this.job.ping === '')  return false;

      // todo
      return true;
    },
    OnUpdate : function(){
      event.preventDefault();

      if(!this.OnValidate()){
        return;
      }

      JobService.update(this.job).then(response => {
        this.$emit('success');
      }).catch(error => {
        // console.log(error);
        this.$emit('error');
      }); 
    },
    OnDelete : function(){
      event.preventDefault();
      
      JobService.remove({ job_id : this.$route.params.job_id }).then(response => {
        this.$emit('success');
      }).catch(error => {
        // console.log(error);
        this.$emit('error');
      }); 
    },   
  },
  mounted(){
    this.GetJob();
  },
}
</script>
