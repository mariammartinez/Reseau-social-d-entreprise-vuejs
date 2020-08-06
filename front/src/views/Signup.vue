<template>
  <div class="signup">
    <img class="photo" alt="Vue logo" src="../../img/icon-above-font-small.png" />
    <SignupForm msg="Welcome to groupo" />
  </div>
</template>

<script>
// @ is an alias to /src
import SignupForm from "@/components/SignupForm.vue";

export default {
  name: "signup",
  components: {
    SignupForm,
  },
};
</script>
<style  lang="scss">
  @media screen and (max-width: 800px){
    .photo{
      width: 90%;
    }
  }

</style>

