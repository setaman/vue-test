<template>

  <v-app dark>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
    export default {
        name: 'app'
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
