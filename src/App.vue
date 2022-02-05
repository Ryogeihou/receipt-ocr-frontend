<template>
  <div id="app">
<!--    ルータに登録したページをレンタリング用のタグ-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html,body,#app,.el-container{
padding: 0px;
margin: 0px;
height: 100%;
}
</style>
