<template>

    <v-bottom-nav
            :active.sync="bottomNav"
            :value="true"
            fixed
            shift
            color="transparent">
        <v-btn dark to="/weather">
            <span>weather</span>
            <v-icon>ondemand_video</v-icon>
        </v-btn>

        <v-btn dark to="/login">
            <span>Tab</span>
            <v-icon>music_note</v-icon>
        </v-btn>

        <v-btn dark to="/about">
            <span>Tab</span>
            <v-icon>book</v-icon>
        </v-btn>
    </v-bottom-nav>

</template>

<script>

    export default {
        name: "bottom-nav",
        data () {
            return {
                bottomNav: 1,
            }
        },
    }
</script>

<style lang="scss" scoped>
    .v-bottom-nav{
        background-color: rgba(0, 0, 0, 0.11);
    }

</style>