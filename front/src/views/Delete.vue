<template>
  <div class="delete">
    <img alt="Vue logo" src="../../img/icon-left-font-monochrome-black-small.png" />
    <Delete msg="compte eliminé !" />

   
  </div>
</template>

<script>
// @ is an alias to /src
import Delete from "@/components/Delete.vue";



export default {
  name: "Delete",
  components: {
    Delete;
  },
};
</script>
