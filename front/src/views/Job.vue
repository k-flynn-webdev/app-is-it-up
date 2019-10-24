<template>

  <div class="job-create colour-bg">

    <form>
      
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
          <label for="active"> Active </label>
          <select id="active" name="active" v-model=job.active>
            <template v-for="item in attrs.active">
              <option v-bind:key=item v-bind:value=item>
                {{ item }}
              </option>
            </template>
          </select>
        </div>


        <div class="option">
          <label for="status"> Status </label>
          <p>{{ job.status }}</p>
        </div>


        <div class="option">
          <label for="pings"> Pings </label>
          <p>{{ job.meta.num }}</p>
        </div>

        <div class="option" style="flex-grow:2">
          <template v-for="(period, name) in job.periods">
            <div :key=name style="display: inline-block;margin:0 .5rem;">
              <label> {{ name }} </label>
              <span> {{ RenderPeriod(period) }} </span>
            </div>
          </template>
        </div>

      </div>

      <div class="input-option">

        <div class="option">
          <label for="id"> ID </label>
          <p>{{ job.job_id }}</p>
        </div>
        <div class="option">
          <label for="user"> User </label>
          <p>{{ job.user }}</p>
        </div>       
      </div>
        
      <div class="option">
        <label for="history"> History </label>

        <p v-if="job.fails.length < 1" style="padding-bottom:1rem;">No issues.</p>
        <div v-else>
          <template v-for="(job) in job.fails">
            <p :key=job.id > {{ RenderDate(job.date) }} </p>
          </template> 
        </div>
      </div>  

      <div class="text-right">
        <button v-on:click=OnUpdate class="button"> Update </button>
        <div style="display:inline-block;width:1rem;"></div>  
        <button v-on:click=OnDelete class="button"> Delete </button>
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
  },
  methods : {
    RenderDate : function(input){
      return new Date(input).toLocaleString();
    },
    RenderPeriod : function(input){
      let temp = input.toString();
      let index = temp.indexOf('.');
      if(index === -1) return input;
      let length = index + 3 < temp.length ? index + 3 : temp.length;
      return temp.substring(0,length);
    },
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
    OnUpdate : function(){
      event.preventDefault();

      if(!this.OnValidate()){
        return;
      }

      JobService.update(this.job).then(response => {
        console.log( response.data );
        this.$emit('success');
      }).catch(error => {
        // console.log(error);
        this.$emit('error');
      }); 
    },
    OnDelete : function(){
      event.preventDefault();

      if(!this.OnValidate()){
        return;
      }
      
      JobService.remove({job : this.job}).then(response => {
        console.log( response.data );
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
