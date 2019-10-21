<template>
    
    <tr class="row-split" v-on:click=onClick>

      <td class="widget-status"> {{ getStatus }} </td>  

      <td class="widget-url"> {{ getURL }} </td>  

      <td class="widget-period"> {{ getPeriod }}% </td>  

      <td class="widget-ping"> {{ job.ping }}m </td>  

   </tr>

</template>

<script>
export default {
  name: 'JobWidget',
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
      if( !this.job.active ) return 'in-active';
      return this.job.status;
    },  
    getURL(){
      let newURL = '';
      if( this.job.url.toLowerCase().indexOf('https://') >= 0 ){
        newURL = this.job.url.replace('https://', '');
      }
      if( this.job.url.toLowerCase().indexOf('http://') >= 0 ){
        newURL = this.job.url.replace('http://', '');
      } 
      return newURL;
    },
    getPeriod(){
      return (this.job.periods[ this.period ] * 100).toFixed(2);
    },
  },
  methods : {
    onClick(){
      this.$router.push(`/job/${this.job.job_id}`);
    },
  },
}
</script>

<style>




</style>
