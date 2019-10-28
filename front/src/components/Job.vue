<template>
   
  <div>

    <div class="flex-items">

      <div class="option block">
        <label for="url"> URL </label>
        <input id="url" name="url" placeholder="eg www.myhome.com" type="text" minLength="4" required v-model=job.url /> 
      </div>

    </div> 

    <div class="flex-items">

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

      <div class="option block">
        <label for="params"> Params </label>
        <input id="params" name="params" placeholder="eg user123" type="text" maxLength="50" v-model=job.params />
      </div>

    </div> 

    <div v-if=renderFull>

      <div class="flex-items wrap space-evenly">

        <div class="info">
          <label for="status"> Status </label>
          <Up v-if="getStatus === 1" />
          <Down v-if="getStatus === 2" />
          <Off v-if="getStatus === 3" />
        </div>

        <div class="info">
          <label for="pings"> Pings </label>
          <p>{{ job.meta.num }}</p>
        </div>

        <div class="info">
          <template v-for="(period, name) in job.periods">
            <div class="periods" :key=name>
              <label> {{ name }} </label>
              <p> {{ RenderPeriod(period) }} </p>
            </div>
          </template>
        </div>

        <div class="option">
          <label for="id"> ID </label>
          <p>{{ job.job_id }}</p>
        </div>

        <div class="option">
          <label for="user"> User </label>
          <p>{{ job.user }}</p>
        </div> 

      </div>

      <div style="margin: 1rem 0;">

        <label style="text-align:center;margin-bottom:.5rem;">History</label>

        <div v-if="job.fails.length > 0" class="flex-items wrap space-evenly">

          <div class="item-fail" :key=job.id v-for="job in job.fails">
            <p> {{ RenderDate(job.date) }} </p>
          </div>

        </div>

        <div v-else>
            <p>No downtime.</p>
        </div>

      </div>

    </div>

    <slot></slot>

  </div>

</template>

<script>

import Up from '@/components/Ic_Up.vue'
import Down from '@/components/Ic_Down.vue'
import Off from '@/components/Ic_Off.vue'

export default {
  name: 'JobRender',
  props : {
    attrs : Object,
    job : Object,
  },
  components: {
    Up,
    Down,
    Off,
  },
  computed : {
    renderFull : function(){
      if(this.job.full) return true;
      return false;
    },
    getStatus(){
      if( !this.job.active ) return 3;
      if( !this.job.status ) return 2;
      return 1;
    }, 
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
  },
}
</script>

<style scoped>

label {
  display: block;
  font-weight: bold;
  text-align: left;
}

.flex-items .option {
  margin: .2rem .2rem;
}
.flex-items .option.block {
  flex-grow: 2;
}
.flex-items .option.block input{
  width: 100%;
}

.periods {
  display: inline-block;
  margin: 0 .5rem;
}

.item-fail {
  margin: .3rem;
}
</style>
