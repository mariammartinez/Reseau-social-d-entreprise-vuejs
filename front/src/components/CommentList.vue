<template>
  <div id="commentList">
    <div v-for="comment in comments" :key="comment.id" class="oneComment">
      <div class="userId">{{ comment.userName }}</div>
      <div class="text">{{ comment.text }}</div>
      <div class="date">{{ comment.date }}</div>
      <button @click.prevent="supp(comment.id)" class="delete" btype="button"> Supprimer </button>
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
        console.log("coco");
      this.axios
        .get("http://localhost:3000/comment/all",{
            postId: this.postId
        })
        .then((res) => { console.log("lolo");
          this.comments = res.data.comments;
        })
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  font-size: 2rem;
  font-weight: bold;
}
.date {
  text-align: end;
  font-size: 1rem;
  color: #d4d4d4;
}
</style>
