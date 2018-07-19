<template>
  <v-app
          id="inspire"
          dark
  >
    <v-navigation-drawer
            v-model="drawer"
            fixed
            clipped
            app
            mini-variant
    >
      <v-list dense>
        <second-nav></second-nav>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
            dense
            fixed
            clipped-left
            app
            height="80"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>

      <router-view></router-view>
    </v-content>
    <bottom-nav></bottom-nav>
  </v-app>
</template>

<script>
    import BottomNav from "./components/BottomNav";
    import SecondNav from "./components/SubNav";
    export default {
        components: {SecondNav, BottomNav},
        data: () => ({
            drawer: true,
            items: [
                { icon: 'trending_up', text: 'Most Popular' },
                { icon: 'subscriptions', text: 'Subscriptions' },
                { icon: 'history', text: 'History' },
                { icon: 'featured_play_list', text: 'Playlists' },
                { icon: 'watch_later', text: 'Watch Later' }
            ],
            items2: [
                { picture: 28, text: 'Joseph' },
                { picture: 38, text: 'Apple' },
                { picture: 48, text: 'Xbox Ahoy' },
                { picture: 58, text: 'Nokia' },
                { picture: 78, text: 'MKBHD' }
            ]
        }),
        props: {
            source: String
        }
    }
</script>
<style lang="scss">
  .v-navigation-drawer--mini-variant {
    overflow: visible !important;
  }

</style>