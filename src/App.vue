<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
ul{
  list-style:none
}
html,body{
  height: 100%;
  background: #eee;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


    .inline-input input{
        height: 50px;
    }

    .clearfix:after{
  content:"";
  display:block;
  visibility:hidden;
  clear:both;
  height:0;
}
.clearfix{
  zoom:1;
}
</style>
