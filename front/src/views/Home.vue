<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PostForm msg="Post enregistré !"/>
    <PostList msg="fdf"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'

export default {
  name: 'home',
  components: {
    PostForm,
    PostList
  }
 
}
</script>
