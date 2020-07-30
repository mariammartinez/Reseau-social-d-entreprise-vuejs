<template>
  <div class="home">
    <img alt="groupomania logo" class="photo" src="../../img/icon-left-font-monochrome-black-small.png" />
    <PostForm msg="Post enregistré !" />
    <PostList msg="post" />
   
  </div>
</template>

<script>
  // @ is an alias to /src
  import PostForm from "@/components/PostForm.vue";
  import PostList from "@/components/PostList.vue";


  export default {
    name: "home",
    components: {
      PostForm,
      PostList,
    },
  };
</script>

<style  lang="scss">
  @media screen and (max-width: 800px){
    .photo{
      width:90%;
    }
  }

</style>


