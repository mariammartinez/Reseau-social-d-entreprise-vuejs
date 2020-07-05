<template>
  <div id="app">
    <PostList />
    <PostForm />
  </div>
</template>

<script>
import PostList from './components/PostList'
import PostForm from './components/PostForm'
export default {
  name: 'App',
  components: {
    PostList,
    PostForm
  }
}
</script>

<style lang="scss">

</style>
