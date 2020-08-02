<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="isConnected" to="/">Home</router-link> |
      <router-link class="signup" v-if="!isConnected" to="/signup">Inscription</router-link> |
      <router-link  v-if="!isConnected" to="/login">connexion</router-link>
      <a href="logout" v-if="isConnected" @click.prevent="deconnexion" to="/">déconnexion</a> |
    
    </div>
    <router-view />

    <footer>
      <a href="delete"  v-if="isConnected"  @click.prevent="deleteAccount"> Suppression de votre compte </a>
      <a href="utilisation" > Mentions Legales </a>
    </footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isConnected: sessionStorage.getItem("jwt") !== null,
    };
  },
  methods: {
    deconnexion: function() {
      sessionStorage.clear();
      window.location.href = "/login";
    },

    deleteAccount: function(){ 
      if(window.confirm("voulez-vous supprimer votre compte?"))
        this.axios 
          .delete("http://localhost:3000/user/" + sessionStorage.getItem("userId"))
            .then((res) => { 
              if(
                typeof res.data.message !== "undefined" &&
                res.data.message === "user supprimé"
              ) {
                this.deconnexion()
              } else {
                alert("error");
              } 
            })
            .catch((err) =>{
              console.log(err);
            })
     }
  },

 

};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color:#c4c4c4;;
  }
  .signup{
    background-color: white;
  }

  #nav {
    padding: 30px;
    text-align: right;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #fd2d01;
      }
    }
  }
  @media screen and (max-width: 800px){
    #app{
      width: auto;
    }
  }


</style>
