<template>
   
  <div class="job-create colour-bg">

    <form v-on:submit=OnSubmit>
      
      <div class="input-full">
        <label for="url"> URL </label>
        <input id="url" name="url" placeholder="eg www.myhome.com" type="text" minLength="4" required v-model=form.url /> 
      </div>


      <div class="input-option">

        <div class="option">
          <label for="method"> Method </label>
          <select id="method" name="method" v-model=form.method>
            <template v-for="method in attrs.methods">
              <option v-bind:key=method v-bind:value=method>
                {{ method }}
              </option>
            </template>
          </select>
        </div>  

        <div class="option">
          <label for="ping"> Ping </label>
          <select id="ping" name="ping" v-model=form.ping>
            <template v-for="ping in attrs.pings">
              <option v-bind:key=ping v-bind:value=ping>
                {{ ping }}m
              </option>
            </template>
          </select>
        </div>

        <div class="input">
          <label for="params"> Params </label>
          <input id="params" name="params" placeholder="eg user123" type="text" maxLength="50" v-model=form.params />
        </div>

      </div>

      <div class="text-right">
        <button v-on:click=OnSubmit class="button"> Create </button>
      </div>

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

.job-create {
  border-radius: var(--border-radius);
  border: 1px solid var(--colour-dark);
  margin: .5rem;
  margin-bottom: 1rem; 
}

form {
  padding: .5rem;
}

label {
  display: block;
  font-weight: bold;
}

#params, #url {
  padding: 0 .5rem;
}

.input-full, .input-option {
  display: flex;
  flex-direction: row; 
  margin-bottom: .25rem;
}

.input-option {
  justify-content: space-between;
}

.input-full label {
  margin-right: .5rem;
}
.input-full input, .input-option .input, .input-option .option {
  flex: 1;
}

.input-full input, .input-option  input{
  border-radius: var(--border-radius);
}

.input-full input, .input-option  input, .input-option select{
  background-color: var(--colour-bg);
}

form .button {
  border-radius: var(--border-radius);
  font-weight: bold;
  color: var(--colour-bg);
  background-color: var(--colour-dark);
} 

</style>
