<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
// require('@/assets/style/anim.css');
// require('@/assets/style/custom.css');

// const cNavBar = () => import('./components/c_navbar.vue');
// const cFooter = () => import('./components/c_app_footer.vue');

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--colour-dark);
}
#nav {
  padding: 30px;
}


#nav a {
  font-weight: bold;
  color: var(--colour-dark);
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
