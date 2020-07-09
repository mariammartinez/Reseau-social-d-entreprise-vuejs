<template>
    <form @submit.prevent="submit" action="/post" method="post" class="form-post">

                <div class="form-post">
                    <label for="title">titre</label>
                    <input v-model="postTitle" type="text" name="title" id="title" maxlength="20" required>
                </div>
                <div class="form-post">
                  <label for="text">exprime-toi</label>
                  <input v-model="postText" type="text" name="exprime-toi" id="text" required>
                </div>
                      <div class="form-post">
                  <label for="text">ajouter une image</label>
                  <input v-model="postImage" type="text" name="image" id="text" required>
                </div>
                

                <div class="form-post">
                  <input  type="submit" value="Publier!">
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
      postText: '',
      postImage: ''
    }
  },
  props: {

  },
  methods: {
    submit: function(){
      axios.post('http://localhost:3000/post', {
        title: this.postTitle,
        text: this.postText,
        image: this.postImage,

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
