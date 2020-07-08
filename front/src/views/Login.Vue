<template>
  <div class="Login">
    <LoginForm msg="Welcome to groupo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.Vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>
