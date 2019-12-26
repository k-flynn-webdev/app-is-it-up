<template>
    <card>
        <h1>Login</h1>
        <div class="form">
            <div class="form-item-block">
                <label for="email"> Email </label>
                <input id="email" minLength="4" required type="email" name="email"
                       placeholder="me @ me.com" v-model="user.email">
            </div>
            <div class="form-item-block">
                <label for="password"> Password </label>
                <input id="password" minLength="8" required type="password" name="password"
                       placeholder="* * *" v-model="user.password">
            </div>
            <div style="text-align: right;">
                <button class="button" @click="onSubmit">Login</button>
            </div>
        </div>
    </card>
</template>

<script>
  import Paths from '@/constants/paths'
  import Card from '@/components/Card.vue'
  import UserService from '../helpers/UserService.js'

  export default {
    name: 'user-login',
    data () {
      return {
        user: {
          email: '',
          password: '',
        },
      }
    },
    components: {
      Card,
    },
    methods: {
      onSubmit: function () {
        // todo : validate all input
        return UserService.login(this.user)
          .then(response => {
            this.$root.$emit('message', response.data.message)
            setTimeout(() => {
              this.$router.push({ name: Paths['HOME']})
            }, 1500)
          })
          .catch(error => {
            this.$root.$emit('message', error.response.data.message)
          })

      },
    }
  }
</script>


<style>
    .form {
        margin: .5rem 0.5rem 1rem 0.5rem;
    }

    .form-item-block {
        margin: 0 auto;
    }

    .form-item-block input {
        width: 100%;
        margin-bottom: 1rem;
    }
</style>


