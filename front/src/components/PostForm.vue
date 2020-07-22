<template>
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
</template>

<script>
export default {
  name: "PostForm",
  data: function() {
    return {
      postTitle: "",
      postText: "",
    };
  },
  props: {},
  methods: {
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
            window.location.href = "/";
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
  .form-post{
    margin: 10px;
    padding: 10px;
  }
</style>
