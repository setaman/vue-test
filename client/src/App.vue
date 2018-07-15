<template>

  <v-app app dark>
    <v-content>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
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
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

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
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
