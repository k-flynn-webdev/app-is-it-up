<template>
    <li @click.stop="onLogout"><a href="#home">Logout</a></li>
</template>

<script>

  import UserService from '../helpers/UserService.js'

  export default {
    name: 'user-logout',
    methods: {
      onLogout: function () {
        UserService.logout()
          .then(response => {
            this.$root.$emit('message', response.data.message)
            this.$root.$emit('user')
          })
          .catch(err => {
            this.$root.$emit('message', err.response.data.message)
          })
      }
    }
  }
</script>


