<template>
  <div class="home">
    <img alt="groupomania logo" class="photo" src="../../img/icon-left-font-small.png" />
 
    <PostList msg="post" />
   
  </div>
</template>

<script>
  // @ is an alias to /src
  import PostList from "@/components/PostList.vue";


  export default {
    name: "home",
    components: {
      PostList,
    },
  };
</script>

<style  lang="scss">
  @media screen and (max-width: 800px){
    .photo{
      width: 90%;
    }
  }

  @media screen and (min-width : 768px) and (max-width : 1024px){
    .photo{
      width: 90%
    }
 
  }

</style>


