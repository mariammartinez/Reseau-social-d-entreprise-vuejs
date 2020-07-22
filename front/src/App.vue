<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="isConnected" to="/">Home</router-link> |
      <router-link class="signup" v-if="!isConnected" to="/signup">Inscription</router-link>|
      <router-link  v-if="!isConnected" to="/login">connexion</router-link>
      <a href="logout" v-if="isConnected" @click.prevent="deconnexion" to="/"
        >déconnexion</a
      >
    </div>
    <router-view />
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
</style>
