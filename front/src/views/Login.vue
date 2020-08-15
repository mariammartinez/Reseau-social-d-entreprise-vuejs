<template>
  <div class="login">
    <img class="photo" alt="Vue logo" src="../../img/icon-left-font-small.png" />
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

<style  lang="scss">
  @media screen and (max-width: 800px){
    .photo{
      width:90%;
    }
  }

</style>


