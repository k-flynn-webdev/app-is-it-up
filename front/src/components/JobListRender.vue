<template>
    
    <tr class="row-split" v-on:click=onClick>

      <td class="widget-status"> 

        <Up v-if="getStatus === 1" />
        <Down v-if="getStatus === 2" />
        <Off v-if="getStatus === 3" />

      </td>

      <td class="widget-url"> {{ getURL }} </td>  

      <td class="widget-period"> {{ getPeriod }}% </td>  

      <td class="widget-ping"> {{ job.ping }}m </td>  

   </tr>

</template>

<script>

import Up from '@/components/Ic_Up.vue'
import Down from '@/components/Ic_Down.vue'
import Off from '@/components/Ic_Off.vue'

export default {
  name: 'JobWidget',
  components: {
    Up,
    Down,
    Off,
  },  
  props: {
    job : {
      method : String,
      status : Boolean,
      active : Boolean, 
      url : String,
      period : Array,
      ping : Number,
      params : String,
    },
    period : String,
  },  
  computed : {
    getStatus(){
      if( !this.job.active ) return 3;
      if( !this.job.status ) return 2;
      return 1;
    },  
    getURL(){
      const maxLength = 18;
      let newURL = '';
      if( this.job.url.toLowerCase().indexOf('https://') >= 0 ){
        newURL = this.job.url.replace('https://', '');
      }
      if( this.job.url.toLowerCase().indexOf('http://') >= 0 ){
        newURL = this.job.url.replace('http://', '');
      }

      if(newURL.length > maxLength ){
        newURL = newURL.substring(0,maxLength);
      }

      return newURL;
    },
    getPeriod(){
      return (this.job.uptime[ this.period ] * 100).toFixed(2);
    },
  },
  methods : {
    onClick(){
      this.$router.push(`/job/${this.job.job_hash}`);
    },
  },
}
</script>

<style>

</style>
