<template>

  <div class="job-create colour-bg">

    <form v-on:submit=OnSubmit>
      
      <div class="input-full">
        <label for="url"> URL </label>
        <input id="url" name="url" placeholder="eg www.myhome.com" type="text" minLength="4" required v-model=job.url /> 
      </div>


      <div class="input-option">

        <div class="option">
          <label for="method"> Method </label>
          <select id="method" name="method" v-model=job.method>
            <template v-for="method in attrs.methods">
              <option v-bind:key=method v-bind:value=method>
                {{ method }}
              </option>
            </template>
          </select>
        </div>  

        <div class="option">
          <label for="ping"> Ping </label>
          <select id="ping" name="ping" v-model=job.ping>
            <template v-for="ping in attrs.pings">
              <option v-bind:key=ping v-bind:value=ping>
                {{ ping }}m
              </option>
            </template>
          </select>
        </div>

        <div class="input">
          <label for="params"> Params </label>
          <input id="params" name="params" placeholder="eg user123" type="text" maxLength="50" v-model=job.params />
        </div>

      </div>

      <div class="input-option">

        <div class="option">
          <label for="method"> Active </label>
          <p>{{ job.active }}</p>
        </div>

        <div class="option">
          <label for="method"> Status </label>
          <p>{{ job.status }}</p>
        </div>


        <div class="option">
          <label for="method"> Pings </label>
          <p>{{ job.meta.num }}</p>
        </div>

        <div class="option">
          <label for="method"> Periods </label>
          <p>{{ job.periods }}</p>
        </div>

      </div>

      <div class="option">
        <label for="method"> ID </label>
        <p>{{ job.job_id }}</p>
      </div>
      <div class="option">
        <label for="method"> User </label>
        <p>{{ job.user }}</p>
      </div>       

      <div class="option">
        <label for="method"> History </label>
        <p>{{ job.fails.length > 0 ? job.fails : 'No issues.' }}</p>
      </div>  

      <div class="text-right">
        <button v-on:click=OnSubmit class="button"> Update </button>
        <button v-on:click=OnSubmit class="button"> Delete </button>
      </div>

    </form>

  </div>
</template>

<script>

import JobCreate from '@/components/JobCreate.vue'
import JobService from '../helpers/JobService.js';

export default {
  name: 'job',
  data(){
    return {
      attrs : {
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
  },
  methods : {
    GetJob : function( job_id ){
      JobService.get_job({ job_id : job_id }).then(response => {
        this.job = response.data.data.job[0];
      }).catch(error => {
        console.log(error);
      });
    },
    OnValidate : function(){

      if(this.job.url.length < 4)  return false;
      if(this.job.method === '')  return false;
      if(this.job.ping === '')  return false;

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
  mounted(){
    this.GetJob( this.$route.params.job_id );
  },
}
</script>
