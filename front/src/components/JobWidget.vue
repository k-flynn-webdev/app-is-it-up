<template>
   
  <div class="job-widget colour-bg">

    <!-- <div class="bg "> -->

      <div class="sect status">
        <p class="widget-label"> status </p>  
        <p class="widget-value"> {{ getStatus }} </p>  
      </div>

      <div class="sect url">
        <div>
          <span class="widget-label"> url </span>  
          <span class="widget-label method"> 
            <em> {{ job.method }} </em>
          </span>
        </div>
        <p class="widget-value"> {{ job.url }} </p>  
      </div>

      <!-- todo -->
      <div class="sect period">
        <p class="widget-label"> week </p>  
        <p class="widget-value"> 97% </p>  
        <!-- <p class="widget-label"> {{ getPeriod.type }} </p>   -->
        <!-- <p class="widget-value"> {{ getPeriod.value }}% </p>   -->
      </div>

      <div class="sect ping">
        <p class="widget-label"> ping </p>  
        <p class="widget-value"> {{ job.ping }}m </p>  
      </div>

     <!-- </div> -->

  </div>

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
      period_display : Number,
      ping : Number,       
      params : String,       
    },
  },  
  computed : {
    getStatus(){
      if( !this.job.active ) return 'in-active';
      return this.job.status;
    },    
    getPeriod(){
      let tmp = this.job.period[ this.job.period_display ];
      return { type : tmp.type, value : tmp.value * 100 };
    },
  },
  methods : {
  },
}
</script>

<style>

  .job-widget {
    margin: .5rem;
  }
  .status {
    min-width: 10%;
  }
  .period {
    min-width: 15%;
  }  
  .ping {
    min-width: 15%;
  }
  .url {
    min-width: 55%;
  }

  .job-widget .bg{
    position: relative;
    display: inline-block;
    border: 1px solid black;
    border-radius: .75rem;
  }

  .job-widget .sect {
    box-sizing: border-box;
    /*margin: 0.1rem 1rem;*/
    display: inline-block;
    /*todo make responsive on margins*/
  }

  .widget-label, .widget-value{
    text-align: center;
  }
  .widget-label {
    margin: .25rem 0.5rem;
  }
  .widget-value{
    margin: .25rem 0.5rem;
  }

  .url .widget-label {
    text-align: left;
  }

  .job-widget .method{
  }

</style>
