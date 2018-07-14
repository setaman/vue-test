<template>

    <v-bottom-nav
            :active.sync="bottomNav"
            color="transparent"
            :value="true"
            absolute
            shift
    >
        <v-btn dark to="/">
            <span>Video</span>
            <v-icon>ondemand_video</v-icon>
        </v-btn>

        <v-btn dark to="/login">
            <span>Music</span>
            <v-icon>music_note</v-icon>
        </v-btn>

        <v-btn dark to="/about">
            <span>Book</span>
            <v-icon>book</v-icon>
        </v-btn>
    </v-bottom-nav>

</template>

<script>
    export default {
        name: "bottom-nav",
        data () {
            return {
                bottomNav: 0,
            }
        },
    }
</script>

<style scoped>

</style>