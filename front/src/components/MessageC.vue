<template>
  <div class="message-holder" :class=state >
    <p class="text label text-center" v-on:click=OnReset > {{ message }} </p>
  </div>
</template>

<script>

export default {
  name: 'MessageC',
  data(){
    return {
      attrs : {
        waitTime : 3.5,
      },
      state : '',
      message : '',
    }
  },
  methods : {
    OnMessage : function(input){
        let self = this;
        self.state = 'display';
        self.message = input;
        scroll(0, 0);
        setTimeout( function(){
          self.state = '';
        }, this.attrs.waitTime * 1000);
        setTimeout( function(){
          self.OnReset();
        }, (this.attrs.waitTime + 1)* 1000);        
    },
    OnReset : function(){ 
      this.message = '';
      this.state = '';
    },
  },
  mounted(){
    this.OnReset();
    this.$root.$on('message' , this.OnMessage);
  },
}
</script>


<style scoped>
  .message-holder {
    margin: 1rem 0;
    transition: .5s;
    opacity: 0;
    position: absolute;
    width: 100%;
  }
  .display {
    opacity: 1;
  }
</style>