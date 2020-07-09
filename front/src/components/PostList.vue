<template>
    <ul>
        <li v-for="post in posts" :key="post.id">
            {{ post.title }} {{ post.text }} {{post.date}}
        </li>
    </ul>
</template>

<script>
const axios = require('axios');
export default {
  name: 'PostList',
  data: function() {
      return {
          posts: []
      }
  },
  props: {
     

  },
  mounted:function() {
      this.refresh()
  },
  methods: {
      refresh: function() {
        axios.get('http://localhost:3000/post/all')
        .then((res) => {
            this.posts = res.data.posts
        })
        .catch((err) => {
            console.log(err);
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li{
  list-style: none;
}

</style>
