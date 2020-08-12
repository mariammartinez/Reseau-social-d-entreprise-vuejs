<template>
  <form
    @submit.prevent="login" action="/user/login" method="post" class="form">
    <div class="form">
    <h1>Connectez-vous</h1>
      <label for="email"></label>
      <input v-model="email" type="email" name="email" id="email" placeholder="Email" required/>
    </div>
    <div class="form">
      <label for="password"></label>
      <input v-model="password" type="password" name="password" id="password" minlength="8" placeholder="Mot de passe" required/>
    </div>
    <div class="form">
      <input type="submit" value="Connexion" class="button" />
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  props: {},
  methods: {
    login: function() {
      this.axios
        .post("http://localhost:3000/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "utilisateur non trouvé!"
          ) {
            // pas bon
          } else {
            sessionStorage.setItem("jwt", res.data.token);
            sessionStorage.setItem("userId", res.data.userId);
            sessionStorage.setItem("isAdmin", res.data.isAdmin);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("no");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import  '../assets/scss/_mixins.scss';
  .form {
    margin:10px;  
  }

  .button {
    @include button-connect;

  }
    


</style>
