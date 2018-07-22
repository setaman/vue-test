<template>
  <v-app dark>
    <v-content>
      <transition name="router-animation">
        <router-view></router-view>
      </transition>
    </v-content>
    <bottom-nav></bottom-nav>
  </v-app>
</template>

<script>
    import BottomNav from "./components/BottomNav";
    export default {
        components: { BottomNav},
        data: () => ({}),
        props: {}
    }
</script>
<style lang="scss">
  .router-animation-enter-active {
    animation: enter 0.3s linear;
  }
  .router-animation-leave-active {
    animation: leave 0.3s linear;
  }

  @keyframes enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }

  }
  @keyframes leave {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }

  }
</style>