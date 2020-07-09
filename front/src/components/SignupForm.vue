<template>
    <form @submit.prevent="signup" action="/user/signup" method="post" class="form-example">
        <div class="form-example">
            <label for="name">Prénom</label>
            <input v-model="name" type="text" name="name" id="name" required>
        </div>
        <div class="form-example">
            <label for="lastName">Nom</label>
            <input v-model="lastName" type="text" name="lastName" id="lastName" required>
            </div>
        <div class="form-example">
            <label for="email">Email</label>
            <input  v-model="email"  type="email" name="email" id="email" required>
        </div>
        <div class="form-example">
            <label for="password">Mot de passe</label>
            <input v-model="password" type="password" name="password" id="password" minlength="8" required>
        </div>
        <div class="form-example">
            <input type="submit" value="Inscription">
        </div>
    </form>
</template>

<script>
const axios = require('axios');
export default {
    
  name: 'SignupForm' ,
  data: function() {
      return {
          name: '',
          lastName: '',
          email:'',
          password:''
          
      }
  },
  props: {

  },
  methods:{
      signup: function(){
        axios.post('http://localhost:3000/user/signup', {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password

      })
          .then((res) => {
            if(typeof res.data.message !== 'undefined' && res.data.message === 'Utilisateur crée!'){
            // on est content 
            }else{
            alert('error');}
      })
        .catch((err) => {
        console.log(err);})
        },
      
    }
}
 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
