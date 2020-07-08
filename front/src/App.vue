<template>
  <div id="app">
    <PostList />
    <PostForm />
    <SignupForm />
  </div>
</template>

<script>
//import PostList from './components/PostList'
import PostForm from './components/PostForm'
//import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
export default {
  name: 'App',
  components: {
    //PostList,
    PostForm,
    SignupForm
    //LoginForm

  }
}
</script>

<style lang="scss">

</style>
