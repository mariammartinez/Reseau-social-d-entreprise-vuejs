<template>
  <div> 
    <form @submit.prevent="submit" action="/post" method="post" class="form-post">
      <div class="form-post">
        <h1> Exprimez-vous </h1>
        <label for="title"></label>
        <input v-model="postTitle" type="text" name="title" id="title" maxlength="20" placeholder="TITRE"/>
      </div> 
      <div class="form-post">
        <label for="text"></label>
        <textarea v-model="postText" type="text" name="exprime-toi" id="text" placeholder="votre texte ici" required></textarea>
      </div>
      <!--  <div class="form-post">
                    <label for="img"></label>
                    <input v-model="postImg" type="img" name="img" id="img">
                  </div>
            -->
      <div class="form-post">
        <input type="submit" value="Publier!" />
      </div>
    </form>
    <div id="postList">
      <div v-for="post in posts" :key="post.id" class="onePost">
        <button @click.prevent="supp(post.id)" v-if="isAuthor(post)" class="delete" type="button">supprimer</button>
        <div class="userId">{{ post.userName }}</div>
        <div class="date">{{ post.date }}</div>
        <div class="title">{{ post.title }}</div>
        <div class="text">{{ post.text }}</div>
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
    };
  },
  props: {},
  mounted: function() {
    this.refresh();
  },
  methods:  {

    submit: function() {
    this.axios
      .post("http://localhost:3000/post", {
        title: this.postTitle,
        text: this.postText,
      })
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

// trouve position du post supprimé
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../../public/scss/_mixins.scss';
  #postList {
    display: block;
    margin: auto;
    width: 40%;
  }

  .onePost {
    box-shadow: -4px -1px 5px 0px rgba(209, 202, 209, 1);
    margin: 10px;
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
    color: #d4d4d4;
  }
  .userId {
    text-align: start;
  }

  .delete{
  
  @include button-supp;
  }

  .delete:hover{
    font-weight: bold;
  }

   @media screen and (max-width: 800px){

    #postList{
      width: 90%;
    }
  }

  .form-post{
    margin: 10px;
    padding: 10px;
  }


</style>
