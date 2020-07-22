<template>
  <div id="postComment">
    <button @click="commentStart" v-show="!displayForm" id="comment">Commenter</button>
    <textarea v-show="displayForm" v-model="comment"> </textarea>
    <button @click.prevent="click" v-show="displayForm" id="send">Envoyer</button>
  </div>
</template>

<script>
export default {
  name: "CommentForm",
  data: function() {
    return {
      comment: "",
      displayForm: false,
    };
  },
  props: {
    postId: Number,
  },

  methods: {
    click: function() {
      alert("commentado");
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
            //window.location.href = '/';
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
  #comment{   
    border: none;
    background-color: white;
    font-family: Helvetica;
    padding: 3px;
    color: #7575a3;
    cursor: pointer;
  }

  #comment:hover{
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
