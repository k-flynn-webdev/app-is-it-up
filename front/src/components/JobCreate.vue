<template>
   
  <div class="job-widget colour-bg">

    <form v-on:submit=OnSubmit>
      
      <label for="method"> Method </label>

      <select id="method" name="method" v-model=form.method>
        <template v-for="method in attrs.methods">
          <option v-bind:key=method v-bind:value=method>
            {{ method }}
          </option>
        </template>
      </select>

      <label for="ping"> Ping </label>

      <select id="ping" name="ping" v-model=form.ping>
        <template v-for="ping in attrs.pings">
          <option v-bind:key=ping v-bind:value=ping>
            {{ ping }}m
          </option>
        </template>
      </select>

      <label for="url"> URL </label>

      <input id="url" name="url" placeholder="eg www.myhome.com" type="text" minLength="4" required v-model=form.url /> 

      <label for="url"> Params </label>

      <input id="params" name="params" placeholder="eg user123" type="text" maxLength="50" v-model=form.params />

      <button v-on:click=OnSubmit> Create </button>

    </form>

  </div>

</template>

<script>

import JobService from '../helpers/JobService.js';

export default {
  name: 'JobCreate',
  data(){
    return {
      attrs : {
        pings : [1,15,30,45,60],
        methods : ['GET','POST','PUT','DELETE'],
      },
      form : {
        url : '',
        params : '',
        method : 'GET',
        ping : 30,
      },
    }
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
