<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <SignupForm msg="Welcome to groupo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from '@/components/SignupForm.vue'

export default {
  name: 'signup',
  components: {
    SignupForm
  }
}
</script>
