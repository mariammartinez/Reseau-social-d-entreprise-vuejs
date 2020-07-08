<template>
     <form action="" method="get" class="form-example">
                <div class="form-example">
                  <label for="email">email</label>
                  <input type="email" name="email" id="email" required>
                </div>
                <div class="form-example">
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password" minlength="8" required>
                </div>
                <div class="form-example">
                  <input type="submit" value="Subscribe!">
                </div>
              </form>
</template>

<script>
//const axios = require('axios');
export default {
  name: 'LoginForm',
  data: function() {
      return {
          posts: []
      }
  },
  props: {

  },
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
