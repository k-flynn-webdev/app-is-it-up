<template>
  <div id="app">
    <div id="nav">
      <router-link class="poster" to="/">
      <div class="logo" style="transform:translateY(25%)translateX(-25%);">
        <svg  width="100%" height="100%" viewBox="0 0 183 190" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <path d="M58.889,94.523l-23.777,-23.777l70.71,-70.711l70.711,70.711l-23.777,23.777l-46.934,-46.933l-46.933,46.933Z"/>
            <path d="M123.785,94.523l23.777,23.777l-70.711,70.711l-70.711,-70.711l23.778,-23.777l46.933,46.934l46.934,-46.934Z"/>
        </svg>
      </div>
      <h1 class="logo-text"> Is It Up</h1>
    </router-link>
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

.icon {
  margin: 0 auto;
  text-align: center;
  width: 1.55rem;
  transform: translateY(.25rem);
}
.logo {
  width: 4rem;
  display: inline-block;
  fill: var(--colour-pop);
  color: var(--colour-pop);
}
.logo-text {
  display: inline-block;
}


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

label, .label {
  padding-bottom: .35rem;
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

input:focus, select:focus {
  outline: 2px solid white;
}
button:focus, .button:focus {
  background-color: hsla(210,33%,75%,.5);
  border: 1px solid white;
}


</style>
