<template>
  <button class="button" :class=state v-on:click=OnClick >
    <slot />
  </button>
</template>

<script>

export default {
  name: 'ButtonC',
  data(){
    return {
      attrs : {
        waitTime : 1.8,
      },
      state : '',
    }
  },
  methods : {
    OnSuccess : function(){
        let self = this;
        self.state = 'success';
        setTimeout( function(){
          self.state = '';
          self.$emit('done');
        }, this.attrs.waitTime * 1000);
    },
    OnFail : function(){
        let self = this;
        self.state = 'fail';
        setTimeout( function(){
          self.state = '';
          self.$emit('done');
        }, this.attrs.waitTime * 1000);
    },
    OnReset : function(){ 
      this.state = '';
    },
    OnClick : function(){
      this.$emit('click');
    },
  },
  mounted(){
    this.OnReset();
  },
}
</script>
