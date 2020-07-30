<template>
  <form @submit.prevent="signup" action="/user/signup" method="post" class="form">
  <h1>Inscrivez-vous</h1>
    <div class="form">
      <label for="name"></label>
      <input v-model="name" type="text" name="name" id="name" placeholder="Prenom" required />
    </div>
    <div class="form">
      <label for="lastName"></label>
      <input v-model="lastName" type="text" name="lastName" id="lastName" placeholder="Nom" required/>
    </div>
    <div class="form">
      <label for="email"></label>
      <input v-model="email" type="email" name="email" id="email" placeholder="Email" required />
    </div>
    <div class="form">
      <label for="password"></label>
      <input v-model="password" type="password" name="password" id="password" minlength="8" placeholder="Mot de passe" required/>
    </div>
    <div class="form">
      <input type="submit" value="Inscription" id="button" />
    </div>
  </form>
</template>

<script>
export default {
  name: "SignupForm",
  data: function() {
    return {
      name: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  props: {},
  methods: {
    signup: function() {
      this.axios
        .post("http://localhost:3000/user/signup", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "Utilisateur crée!"
          ) {
            alert("user crée");
            window.location.href = "http://localhost:8080/#/";
            // on est content
          } else {
            alert("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import  '../../public/scss/_mixins.scss';

  .form{
    margin:10px;
  }

  #button{
  @include button-connect;
  }
</style>