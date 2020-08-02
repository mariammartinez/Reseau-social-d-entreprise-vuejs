<template>
  <div>
      <div id="postComment">
      <button @click="commentStart" v-show="!displayForm" id="commentPost">Commenter</button>
      <textarea v-show="displayForm" v-model="comment"  onclick="this.value =''"> </textarea>
      <button @click.prevent="click" v-show="displayForm" id="send">Envoyer</button>
    </div>
    <div id="commentList">
      <button @click="commentShow" v-show="!displayComment" id="comment">Commentaires</button>  
      <div v-for="comment in comments" :key="comment.id" v-show="displayComment" class="oneComment">
        <div class="userId">{{ comment.userName }}</div>
        <div class="date">{{ comment.date }}</div>
        <div class="text">{{ comment.text }}</div>
        <button @click.prevent="supp(comment.id)" class="delete" v-if="isMyComment(comment)" btype="button">Supprimer</button>
      </div>
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
      comment: "",
      displayForm: false,
    };
  },
  props: {
    postId: Number,
    postUserId: Number,
  },
  mounted: function() {
    this.refresh();
  },
  methods: {
    refresh: function() {
      this.axios
        .get("http://localhost:3000/comment/post/" + this.postId + "/all")
        .then((res) => {
          
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
            res.data.message === " ok "
          ) {
            let n = 0;
            for(let comment of this.comments){
              if (commentId == comment.id)
              this.comments.splice(n, 1);
            } 

          }else {
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
    isMyComment: function(comment){ 
      return comment.userId == sessionStorage.getItem("userId") || this.postUserId == sessionStorage.getItem("userId") ;
    },
    click: function() {
      this.axios
        .post("http://localhost:3000/comment", {
          text: this.comment,
          postId: this.postId,
        })
        .then((res) => {
          if (
            typeof res.data.message !== "undefined" &&
            res.data.message === "commentaire enregistré!"
          ) {
          this.comments.unshift(res.data.comment)
          this.commentShow();
 
          } else {
            alert("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    commentStart: function() {
      this.displayForm = true;
    },

  },
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  @import  '../../public/scss/_mixins.scss';

  #commentList {
    display: flex;

    flex-direction: column;
    align-items: center;
  }

  .oneComment {
    margin: 10px;
    justify-content : space-around;
    width:50%;
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
    @include  button-supp;
  }

  #comment{
    @include button-comment;
  }

   #commentPost{   
    border: none;
    background-color: white;
    font-family: Helvetica;
    padding: 3px;
    color: #7575a3;
    cursor: pointer;
  }

  #commentPost:hover{
        color: black;
        font-weight: bold;
      }

  #send{
    border: none;
    background-color: white;
    font-family: Helvetica;
    padding: 3px;
    color: #7575a3;
    cursor: pointer;
  }
  #send:hover{
        color: black;
        font-weight: bold;
      }

</style>
