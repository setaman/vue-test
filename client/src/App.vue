<template>

  <v-app app dark>
    <v-content>
        <router-view></router-view>
    </v-content>
    <bottom-nav></bottom-nav>
  </v-app>
</template>

<script>
  import BottomNav from "./components/BottomNav";

    export default {
        name: 'app',
        components: {BottomNav}
    }
</script>

<style lang="scss">
  body, html{
    height: 100%;
      background-color: #f0f0f0;
      #app {
          main {
          }
      }
  }

.v-toolbar__content {
  text-align: center;
  a {
    transition: all .3s;
    font-weight: bold;
    color: #2c3e50;
    &:hover {
      color: #62b9a9;
    ;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
