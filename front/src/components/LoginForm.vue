<template>
     <form action=@submit.prevent="login" action="/user/login"  method="post" class="form-example">
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
name: 'LoginForm' ,
  data: function() {
      return {
          email:'',
          password:''
          
      }
  },
  props: {

  },
  methods:{
    login: function(){
      axios.post('http://localhost:3000/user/login', {
          email: this.email,
          password: this.password

    })
        .then((res) => {
          if(typeof res.data.message !== 'undefined' && res.data.message === 'utilisateur non trouvé!'){
          // pas bon 
          }else{
          alert('bienvenue');}
          //redirection a l'accueil
    })
      .catch((err) => {
      console.log(err);})
      },
    
  }
 
}

