<template>
   
  <form>
    <job-render :attrs=attrs :job=job>

      <div style="text-align:right;">
        <button class="button" v-on:click=OnSubmit>CREATE</button>
      </div>

    </job-render>
  </form>

</template>

<script>

import JobRender from '@/components/Job.vue'
import JobService from '../helpers/JobService.js';

export default {
  name: 'JobCreate',
  data(){
    return {
      attrs : {
        active : [true, false],
        pings : [1,15,30,45,60],
        methods : ['GET','POST','PUT','DELETE'],
      },
      job : {
        active : true,
        url : '',
        params : '',
        method : 'GET',
        ping : 30,
        full : false,
      },
    }
  },
  components: {
    JobRender,
  },
  computed : {
  },
  methods : {
    OnValidate : function(){

      if(this.form.url.length < 4)  return false;
      if(this.form.method === '')  return false;
      if(this.form.ping === '')  return false;

      // todo
      return true;
    },
    OnSubmit : function(){
      event.preventDefault();

      if(!this.OnValidate()){
        return;
      }

      JobService.create(this.form).then(response => {
        // console.log( response.data.data.jobs );
        this.$emit('success');
      }).catch(error => {
        // console.log(error);
        this.$emit('error');
      });      

    },
  },


}
</script>

<style>

</style>
