<template>
  <div class="login">
    <img alt="Vue logo" src="../../img/icon-left-font-monochrome-white-small.png" />
    <LoginForm msg="Welcome to groupo" />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm,
  },
};
</script>
