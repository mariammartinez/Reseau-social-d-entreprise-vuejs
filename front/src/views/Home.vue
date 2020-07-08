<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <PostForm msg="Welcome to groupo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'Home',
  components: {
    PostForm
  }
}
</script>
