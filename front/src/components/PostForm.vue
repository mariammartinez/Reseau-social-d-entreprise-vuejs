<template>
    <form @submit.prevent="submit" action="/post" method="post" class="form-post">
                <div class="form-example">
                  <label for="text">texte</label>
                  <input v-model="postText" type="text" name="text" id="text" required>
                </div>
                <div class="form-example">
                    <label for="title">titre</label>
                    <input v-model="postTitle" type="text" name="title" id="title" maxlength="20" required>
                </div>
                

                <div class="form-example">
                  <input  type="submit" value="Subscribe!">
                </div>
              </form>
</template>

<script>
const axios = require('axios');
export default {
  name: 'PostForm',
  data: function() {
    return {
      postTitle: '',
      postText: ''
    }
  },
  props: {

  },
  methods: {
    submit: function(){
      axios.post('http://localhost:3000/post', {
        title: this.postTitle,
        text: this.postText,

      })
          .then((res) => {
        if(typeof res.data.message !== 'undefined' && res.data.message === 'Post enregistré !'){
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
