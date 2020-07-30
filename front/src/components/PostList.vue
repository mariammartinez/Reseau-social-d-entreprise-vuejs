<template>
  <div id="postList">
    <div v-for="post in posts" :key="post.id" class="onePost">
      <button @click.prevent="supp(post.id)" v-if="isAuthor(post)" class="delete" type="button">supprimer</button>
      <div class="userId">{{ post.userName }}</div>
      <div class="date">{{ post.date }}</div>
      <div class="title">{{ post.title }}</div>
      <div class="text">{{ post.text }}</div>
      <CommentForm :postId="post.id" />
      <CommentList :postId="post.id" :postUserId="post.userId" />
    </div>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm.vue";
import CommentList  from "@/components/CommentList.vue";

export default {
  name: "PostList",
  components: {
    CommentForm,
    CommentList,
  },
  data: function() {
    return {
      posts: [],
    };
  },
  props: {},
  mounted: function() {
    this.refresh();
  },
  methods: {
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
    debug: function(str) {
      console.log(str);
    },
    supp: function(postId) {
      this.axios
        .delete("http://localhost:3000/post/" + postId)
        .then((res) => { 
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "Post supprimé !"
          ) {
            window.location.href = "/";
              alert("ok");
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


</style>
