<template>
  <div> 
    <form @submit.prevent="submit" action="/post" method="post" class="form">
      <div class="form-post">
        <h1> Exprimez-vous </h1>
        <label for="title"></label>
        <input v-model="postTitle" type="text" name="title" id="title" maxlength="30" placeholder="TITRE"/>
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
        <button @click.prevent="supp(post.id)" v-if="isAuthorOrAdmin(post)" class="delete" type="button"><i class="fas fa-trash-alt"></i></button>
        <button class="modify" type="button"  @click="updateStart(post)" v-show="!post.displayForm" v-if="isAuthorOrAdmin(post)"><i class="fas fa-pencil-alt"></i></button>
          <form @submit.prevent="updatePost(post)"  action="/post" method="put" class="update" v-if="isAuthorOrAdmin(post)"  v-show="post.displayForm">
            <div class="form-update">
              <label for="title"></label>
              <input v-model="post.title" type="text" name="title" id="title" maxlength="30" />
            </div> 
            <div class="form-update">
              <label for="text"></label>
              <textarea v-model="post.text" type="text" name="exprime-toi" id="text"  required></textarea>
            </div>
            <div class="form-update">
              <input type="submit" value="modifier!"  class="post-button" />
            </div>
          </form>
        <div class="userId">{{ post.userName }}</div>
        <div class="date">{{ post.date }}</div>
        <div v-show= "!post.displayForm">
          <div class="title">{{ post.title }}</div>
          <div class="text">{{ post.text }}</div>
          <figure v-if= "onlyText(post.img)"> <img :src="post.img" alt="image" title="image" id="image"> </figure>
        </div>
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
    submit: function() {
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
          this.posts.unshift(res.data.post);
          this.postTitle = "";
          this.postText = "";
      
        }

         else {
          alert("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    isAuthorOrAdmin: function(post) {
      return post.userId == sessionStorage.getItem("userId")  
      || 1 == sessionStorage.getItem("isAdmin");
    },

   
    refresh: function() {
      this.axios
        .get("http://localhost:3000/post/all")
        .then((res) => {
          for(let post of res.data.posts){
            post.displayForm = false;
          }
          this.posts = res.data.posts;
        })
        .catch((err) => {
          console.log(err);
        });
    },
     updatePost: function(post){ console.log(post);
       this.axios
       .put("http://localhost:3000/post/" + post.id, {
         postText : post.text,
         postTitle : post.title
       })
       .then((res) =>{
         if(
            typeof res.data.message !== "undefined" &&
            res.data.message === "Post modifié !"
         ){
           post.displayForm = false;
         }

       })
         .catch((err) => {
          console.log(err);
        }); 
      
    },

    supp: function(postId) {
      if(window.confirm("voulez-vous supprimer le post?"))
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
      return postImg != "null";
    },
    updateStart: function(post) {
      post.displayForm = true;
      
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../assets/scss/main.scss';
  #postList {
    @include post-list;
    @include media-phone;
  }

  .onePost {
    @include  one-post;
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

  #image{
    @include media-phone;
    width: 40%;
  
  }
  .form{
    @include form-post;
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
  
    @include  button-connect;
  }
  .modify{
    @include button-supp;
  
  }

</style>
