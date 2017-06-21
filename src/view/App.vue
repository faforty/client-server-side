<template>
  <div id="app" class="app">
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link> | <router-link :to="{ name: 'about' }">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="stylus">
  .app {
    color: #dedede;
  }
</style>
