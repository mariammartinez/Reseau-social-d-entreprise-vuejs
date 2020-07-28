<template>
  <div id="commentList">
      <button @click="commentShow" v-show="!displayComment" id="comment">Commentaires</button>  
    <div v-for="comment in comments" :key="comment.id" v-show="displayComment" class="oneComment">
      <div class="userId">{{ comment.userName }}</div>
      <div class="date">{{ comment.date }}</div>
      <div class="text">{{ comment.text }}</div>
      <button @click.prevent="supp(comment.id)" class="delete" btype="button">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentList",
  components: {},
  data: function() {
    return {
      comments: [],
      displayComment: false,
    };
  },
  props: {
    postId: Number,
  },
  mounted: function() {
    this.refresh();
  },
  methods: {
    refresh: function() {
      this.axios
        .get("http://localhost:3000/comment/post/" + this.postId + "/all")
        .then((res) => {
          console.log("lolo");
          this.comments = res.data.comments;
        });
      //.catch((err) => {
      // console.log(err);
      //});
    },
    debug: function(str) {
      console.log(str);
    },
    supp: function(commentId) {
      this.axios
        .delete("http://localhost:3000/comment/" + commentId)
        .then((res) => {
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "comment supprimé !"
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
    commentShow: function() {
    this.displayComment = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

import sassStyles from '../../public/scss/_mixin.scss'

#commentList {
  display: flex;
  flex-direction: column;
  width: 70%;
}

.oneComment {
  margin: 10px;
}
.userId {
  text-align: start;
  font-size: 0.7rem;
}
.text {
  font-size: 1rem;
  font-weight: italic;
}
.date {
  text-align: start;
  font-size: 0.5rem;
  color: #d4d4d4;
}

.delete{
  include: button;
}
</style>
