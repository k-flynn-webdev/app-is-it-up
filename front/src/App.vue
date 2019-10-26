<template>
  <div id="app">
    <div id="nav" style="margin-top:1rem;">
      <router-link class="poster" to="/">Is It Up</router-link>
    </div>
    <router-view/>
  </div>
</template>



<script>

// adding global style ..
require('@/assets/style/reset.css');
require('@/assets/style/default.css');
require('@/assets/style/colour.css');
require('@/assets/style/text.css');

export default {
  name: 'App', 
  created(){
    document.title = process.env.VUE_APP_NAME;
    // this.$store.dispatch('user/init', this.$request.get_SecureKeyFile );
  },
  computed : {    
  },  
  methods : {
  },
  mounted(){
  },
  components: {
  },
}

</script>


<style>
body {
  background-color: var(--colour-bg);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

p, h1, h2, h3, a, a:visited, .text, .label, label{
  color: var(--colour-pop);
}

.card {
  margin: 2rem 1rem;
  padding: .5rem;
  overflow: hidden;
}
.card, .button {
  border-radius: var(--border-radius);
  background-color: var(--colour-dark);
}

.button {
  margin-top: .5rem;
  font-weight: bold;
  color: var(--colour-pop);
  border: 1px solid var(--colour-pop);
  background-color: var(--colour-dark);
}
.button:hover, .button:active {
  background-color: var(--colour-mid);
}

input, select {
  padding: 0 .5rem;
  color: var(--colour-pop);
  border: 2px solid transparent;
  border-bottom: 2px solid black;
  outline: var(--colour-bg);
  background-color: var(--colour-bg);
}
input {
  border-radius: var(--border-radius);
}

</style>
