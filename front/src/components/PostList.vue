<template>
  <div> 
    <form @submit.prevent="submit" action="/post" method="post" class="form">
      <div class="form-post">
        <h1> Exprimez-vous </h1>
        <label for="title"></label>
        <input v-model="postTitle" type="text" name="title" id="title" maxlength="20" placeholder="TITRE"/>
      </div> 
      <div class="form-post">
        <label for="text"></label>
        <textarea v-model="postText" type="text" name="exprime-toi" id="text" placeholder="votre texte ici" required></textarea>
      </div>
      <div class="form-post">
          <label for="img"></label>
          <input  type="file" name="img" id="img" @change="imageFile">
      </div>
      <div class="form-post">
        <input type="submit" value="Publier!"  class="post-button" />
      </div>
    </form>
    <div id="postList">
      <div v-for="post in posts" :key="post.id" class="onePost">
        <button @click.prevent="supp(post.id)" v-if="isAuthor(post)" class="delete" type="button"><i class="fas fa-trash-alt"></i></button>
        <div class="userId">{{ post.userName }}</div>
        <div class="date">{{ post.date }}</div>
        <div class="title">{{ post.title }}</div>
        <div class="text">{{ post.text }}</div>
        <figure v-if= "onlyText(post.img)"> <img :src="post.img" alt="image" title="image" id="image"> </figure>
       
        <CommentList :postId="post.id" :postUserId="post.userId" />
      </div>
    </div>
  </div>  
</template>

<script>
import CommentList  from "@/components/CommentList.vue";

export default {
  name: "PostList",
  components: {
    CommentList,
  },
  data: function() {
    return {
      postTitle: "",
      postText: "",
      posts: [],
      file: null,
      postImg: null,

    };
  },
  props: {},
  mounted: function() {
    this.refresh();
  },
  methods:  {

    submit: function() {console.log(this.file);
      const fd = new FormData()
    fd.append('image', this.file)
    fd.append('title', this.postTitle)
    fd.append('text', this.postText) 
    this.axios
      .post("http://localhost:3000/post", fd)
      .then((res) => {
        if (
          typeof res.data.message !== "undefined" &&
          res.data.message === "Post enregistré !"
        ) { 
          this.posts.unshift(res.data.post)
        }

         else {
          alert("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    isAuthor: function(post) {
      return post.userId == sessionStorage.getItem("userId");
    },
    refresh: function() {
      this.axios
        .get("http://localhost:3000/post/all")
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    supp: function(postId) {
      this.axios
        .delete("http://localhost:3000/post/" + postId)
        .then((res) => { 
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "Post supprimé !"
          ) {
            let n = 0;

          for(let post of this.posts){
            if (postId == post.id)
            this.posts.splice(n, 1);
         } 
          } else {
              alert("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imageFile(event){
      this.file =event.target.files[0];
    },
    onlyText(postImg){
      console.log(postImg);
      return postImg != "null";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../assets/scss/main.scss';
  #postList {
    display: block;
    margin: auto;
    width: 70%;
  }

  .onePost {
    box-shadow: -4px -1px 5px 0px rgba(209, 202, 209, 1);
    margin-top: 30px;
    background-color: white;
    padding: 10px;
   
  
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .text{
    font-size: 1.5rem;
  }
  .date {
    text-align: start;
    font-size: 0.8rem;
    color: grey;
  }
  .userId {
    text-align: start;
    color: $color-groupo;
    font-weight:  bold;
  }

  .delete{
  @include button-supp;
  }
  .delete:hover{
    font-weight: bold;
  }

  .post-button{
   @include button-post;
  }

   @media screen and (max-width: 800px){

    #postList{
      width: 90%;
    }
  }

  .form{
    padding: 10px;
    background-color: white;
    width: 50%;
    display: block;
    margin: auto;
    box-shadow: 0px 10px 13px -7px #000000;
    border-radius: 5px;
    height: 250px;
  }

  #text{
    width: 80%;
    margin: 10px;
  }

  #title{
    width: 80%;
    margin: 10px;
  }

  #img{
    float: left;
    @include  button-connect;
  }

  #image{
    width: 30%;
  }


</style>
